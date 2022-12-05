const authValidator = require('../../validator/auth/auth.validator');
const ApiError = require("../../error/ApiError");
const authService = require('../../services/Auth/auth.service');
const OAuth = require('../../database/OAuth.schema');
const {tokenTypeEnum} = require('../../enum');

module.exports = {
  isBodyValid: async (req, res, next) => {
    try {
      const validate = authValidator.loginValidator.validate(req.body);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      next()
    } catch (e) {
      next(e)
    }
  },
  checkAccessToken: async (req, res, next) => {
    try {

      const accessToken = req.get('Authorization');

      if (!accessToken) {
        throw new ApiError('no token', 401);
      }
      authService.checksToken(accessToken);

      const tokenInfo = await OAuth.findOne({accessToken});

      if (!tokenInfo) {
        throw new ApiError('token not valid', 401)
      }

      next()
    } catch (e) {
      next(e)
    }
  },
  checkRefreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.get('Authorization');

      if (!refreshToken) {
        throw new ApiError('No token', 401);
      }

      authService.checksToken(refreshToken, tokenTypeEnum.refreshToken);

      const tokenInfo = await OAuth.findOne({refreshToken});

      req.tokenInfo = tokenInfo;

      next()
    } catch (e) {
      next(e)
    }
  }
};
