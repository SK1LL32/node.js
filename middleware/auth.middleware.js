const authValidator = require('../validator/auth.validator');
const authService = require('../service/auth.service');
const Auth = require('../database/Auth.schema');
const Action = require('../database/ActionToken');
const ApiError = require('../error/ApiError');
const OldPassword = require('../database/OldPassword');
const { FORGOT_PASSWORD } = require('../enum/tokenAction.enum');
const { compareOldPasswords } = require('../service/auth.service');
const { tokenTypeEnum } = require('../enum');

module.exports = {
  isBodyValid: async (req, res, next) => {
    try {

      const validate = await authValidator.login.validate(req.body);

      if (validate.error) {
        throw new ApiError(validate.error.message);
      }

      next()
    } catch (e) {
      next(e)
    }
  },
  checksAccessToken: async (req, res, next) => {
    try {

      const accessToken = req.get('Authorization');

      if (!accessToken) {
        throw new ApiError('No token', 401);
      }

      authService.checksToken(accessToken);

      const tokenInfo = await Auth.findOne({ accessToken });

      if (!tokenInfo) {
        throw new ApiError('Token not valid', 401);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checksRefreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.get('Authorization');

      if (!refreshToken) {
        throw new ApiError('No token', 401);
      }

      authService.checksToken(refreshToken, tokenTypeEnum.refreshToken);

      const tokenInfo = await Auth.findOne({ refreshToken });

      if (!tokenInfo) {
        throw new ApiError('Token not valid', 401);
      }

      req.tokenInfo = tokenInfo;
      next();
    } catch (e) {
      next(e);
    }
  },
  checksActionToken: async (req, res, next) => {
    try {
      const actionToken = req.get('Authorization');

      if (!actionToken) {
        throw new ApiError('No token', 401);
      }

      authService.checkActionToken(actionToken, FORGOT_PASSWORD);

      const tokenInfo = await Action.findOne({ actionToken }).populate('_user_id');
      console.log(tokenInfo);

      if (!tokenInfo) {
        throw new ApiError('Token not valid', 401);
      }

      req.user = tokenInfo._user_id;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkOldPasswords: async (req, res, next) => {
    try {
      const { user, body } = req;

      const oldPasswords = await OldPassword.find({ _user_id: user._id }).lean();

      if (!oldPasswords.length) {
        return next();
      }

      const results = await Promise.all(oldPasswords.map((record) => compareOldPasswords(record.password, body.password)));

      const condition = results.some((res) => res);

      if (condition) {
        throw new ApiError('This is old password', 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
