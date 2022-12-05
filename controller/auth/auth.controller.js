const oauthService = require('../../services/Auth/auth.service');
const emailService = require('../../services/email/email.service');
const OAuth = require('../../database/OAuth.schema');

module.exports = {
  login: async (req, res, next) => {
    try {
      const {user, body} = req;

      await emailService.sendEmail('muroslav260@gmail.com')

      await oauthService.comparePassword(user.password, body.password);

      const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

      await OAuth.create({...tokenPair, _user_id: user._id});

      res.json({
        user,
        ...tokenPair
      });
    } catch (e) {
      next(e)
    }
  },
  Refresh: async (req, res, next) => {
      try {
        const { refreshToken, _user_id } = req.tokenInfo;

        await OAuth.deleteOne({ refreshToken });

        const tokenPair = oauthService.generateAccessTokenPair({ id: _user_id });

        await OAuth.create({ ...tokenPair, _user_id })

        res.status(201).json(tokenPair)
      } catch (e) {
          next(e)
      }
  }
};
