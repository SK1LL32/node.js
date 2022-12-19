const Joi = require('joi');

const { EMAIL, PASSWORD } = require('../enum/regexp.enum');

module.exports = {
  login: Joi.object({
    email: Joi.string().regex(EMAIL).lowercase().trim().required(),
    password: Joi.string().regex(PASSWORD).required()
  })
};
