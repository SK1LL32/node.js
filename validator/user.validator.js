const Joi = require('joi');

const { EMAIL, PASSWORD } = require('../enum/regexp.enum')

module.exports = {

  newUserValid: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    age: Joi.number().min(2).max(123).required(),
    email: Joi.string().regex(EMAIL).lowercase().trim().required(),
    password: Joi.string().regex(PASSWORD).min(8).max(25).required()
  }),

  editUserValid: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    age: Joi.number().min(2).max(123).optional(),
    email: Joi.string().regex(EMAIL).lowercase().trim().optional()
  })
}