const Joi = require('joi');

const { EMAIL, PASSWORD, PHONE } = require('../enum/regexp.enum');

module.exports = {
  login: Joi.object({
    email: Joi.string().regex(EMAIL).lowercase().trim().required(),
    password: Joi.string().regex(PASSWORD).required(),
  })
};
