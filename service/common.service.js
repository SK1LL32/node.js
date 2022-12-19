const Joi = require("joi");

const { MONGO_ID } = require('../enum/regexp.enum');

module.exports = {
  idValidator: Joi.string().regex(MONGO_ID)
}