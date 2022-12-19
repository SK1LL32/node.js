const authService = require('../service/auth.service');
const Auth = require('../database/Auth.schema');
const ActionToken = require('../database/ActionToken');
const OldPassword = require('../database/OldPassword');
const emailService = require('../service/email.service');
const userService = require('../service/user.service');
const { WELCOME, FORGOT_PASS } = require('../enum/email.enum');
const { FORGOT_PASSWORD } = require('../enum/tokenAction.enum');
const { FRONTEND_URL } = require('../config/config');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body } = req;

      await emailService.sendEmail(user.email, WELCOME, { userName: user.name });

      await authService.comparePassword(user.password, body.password);

      const tokenPair = authService.generationTokenPair({ id: user._id });

      await Auth.create({
        ...tokenPair,
        _user_id: user._id
      });

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

      await ActionToken.create({ token: actionToken, tokenType: FORGOT_PASSWORD, _user_id: _id });
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

      await ActionToken.deleteOne({ token: req.get('Authorization') });
      await userService.updateOnne({ _id: user._id }, { password: hashPassword })

      res.json('ok')
    } catch (e) {
      next(e)
    }
  }
};
