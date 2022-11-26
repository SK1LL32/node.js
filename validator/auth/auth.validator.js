const Joi = require('joi');

const {EMAIL, PASSWORD} = require("../../config/regexp.enum");

module.exports = {
  loginValidator: Joi.object({
    email: Joi.string().regex(EMAIL).lowercase().trim(),
    password: Joi.string().regex(PASSWORD).min(8).max(25).required()
  })
};
