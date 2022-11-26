const oauthService = require('../../service/Auth/auth.service');
const OAuth = require('../../database/OAuth.schema');

module.exports = {
  login: async (req, res, next) => {
    try {
      const {user, body} = req;

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
  }
};
