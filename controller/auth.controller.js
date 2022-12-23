const { userService, authService, emailService, smsService } = require('../service')
const { Auth, Action, OldPassword } = require('../database');
const smsTemplate = require('../helper/sms.helper');
const { HI } = require('../enum/sms.enam')
const { WELCOME, FORGOT_PASS } = require('../enum/email.enum');
const { FORGOT_PASSWORD } = require('../enum/tokenAction.enum');
const { FRONTEND_URL } = require('../config/config');
const User = require('../database/user.schema')

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body } = req;
      await Promise.allSettled([
        emailService.sendEmail(user.email, WELCOME, { userName: user.name }),
        smsService.smsSend(smsTemplate[HI]({ name: user.name }), user.phone)
      ]);

      await user.comparePasswords(body.password);

      const tokenPair = authService.generationTokenPair({ id: user._id });

      await Auth.create({ ...tokenPair, _user_id: user._id });

      res.json({
        user,
        ...tokenPair
      });
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const { refreshToken, _user_id } = req.tokenInfo;

      await Auth.deleteOne({ refreshToken });

      const tokenPair = authService.generationTokenPair({ id: _user_id });

      await Auth.create({ ...tokenPair, _user_id })

      res.status(201).json(tokenPair);
    } catch (e) {
      next(e)
    }
  },
  forgot_password: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user;

      const actionToken = authService.generationActionToken(FORGOT_PASSWORD, { email: email });
      const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

      await Action.create({ token: actionToken, tokenType: FORGOT_PASSWORD, _user_id: _id });
      await emailService.sendEmail(email, FORGOT_PASS, { url: forgotPassFEUrl, userName: name });

      res.json('ok');
    } catch (e) {
      next(e);
    }
  },
  forgotPasswordAfterForgot: async (req, res, next) => {
    try {
      const { user, body } = req;

      const hashPassword = authService.hashPassword(body.password);

      await OldPassword.create({ _user_id: user._id, password: user.password });

      await Action.deleteOne({ token: req.get('Authorization') });
      await User.updateOne({ _id: user._id }, { password: hashPassword })

      res.json('ok')
    } catch (e) {
      next(e)
    }
  }
};
