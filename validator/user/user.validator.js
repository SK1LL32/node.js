const Joi = require('joi');

const {EMAIL, PASSWORD} = require('../../config/regexp.enum');

module.exports = {
  newUserValidator: Joi.object({
    name: Joi.string().min(2).max(25).required(),
    age: Joi.number().integer().min(1).max(120).required(),
    email: Joi.string().regex(EMAIL).lowercase().trim(),
    password: Joi.string().regex(PASSWORD).min(8).max(25).required()
  }),

  editUserValidator: Joi.object({
    name: Joi.string().min(2).max(25).optional(),
    age: Joi.number().integer().min(1).max(120).optional(),
    email: Joi.string().regex(EMAIL).lowercase().trim().optional(),
  }),
};
