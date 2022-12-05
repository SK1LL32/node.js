const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../../error/ApiError");
const {ACCESS, REFRESH} = require('../../config/config');
const {tokenTypeEnum} = require("../../enum");

module.exports = {

  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePassword: async (hashPassword, password) => {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsSame) {
      throw new ApiError('wrong email or password')
    }
  },

  generateAccessTokenPair: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign, ACCESS, {expiresIn: '15m'});
    const refreshToken = jwt.sign(dataToSign, REFRESH, {expiresIn: '30d'});

    return {
      accessToken,
      refreshToken
    };
  },

  checksToken: (token = '', tokenType = 'accessToken') => {
    try {
      let secret = '';

      if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS;
      else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH;

      return jwt.verify(token, secret);
    } catch (e) {
      throw new ApiError('token not valid', 401);
    }
  }

};
