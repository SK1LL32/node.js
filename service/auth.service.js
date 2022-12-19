const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const tokenType = require('../enum/tokenAction.enum');
const {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
  FORGOT_PASSWORD_ACTION_TOKEN_SECRET
} = require('../config/config');
const { tokenTypeEnum } = require('../enum');
const ApiError = require('../error/ApiError');

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePassword: async (hashPassword, password) => {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsSame) {
      throw new ApiError('wrong email or password', 400)
    }
  },

  compareOldPasswords: (hashPassword, password) => {
    return bcrypt.compare(password, hashPassword);
  },

  generationActionToken: (actionType, dataToSign = {}) => {
    let secretWord = '';

    switch (actionType) {
      case tokenType.CONFIRM_ACCOUNT:
        secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
        break;
      case tokenType.FORGOT_PASSWORD:
        secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
        break;
    }
    return jwt.sign(dataToSign, secretWord, { expiresIn: '7d' });
  },

  generationTokenPair: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign, ACCESS_TOKEN, { expiresIn: '1d' });
    const refreshToken = jwt.sign(dataToSign, REFRESH_TOKEN, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken
    }
  },

  checksToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
    try {
      let secret = '';

      if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_TOKEN
      else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_TOKEN

      return jwt.verify(token, secret)
    } catch (e) {
      throw new ApiError('Token is not valid', 401);
    }
  },

  checkActionToken: (token = '', actionType) => {
    try {
      let secretWord = '';

      switch (actionType) {
        case tokenType.CONFIRM_ACCOUNT:
          secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
          break;
        case tokenType.FORGOT_PASSWORD:
          secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
          break;
      }

      jwt.verify(token, secretWord);
    } catch (e) {
      throw new ApiError('Token not valid', 401);
    }
  }
};