const authValidator = require('../../validator/auth/auth.validator');
const ApiError = require("../../error/ApiError");

module.exports = {
  isBodyValid: async (req, res, next) => {
    try {
      const validate = authValidator.loginValidator.validate(req.body);

      if (validate.error) {
        throw new ApiError(validate.error.message,400)
      }

      next()
    } catch (e) {
      next(e)
    }
  }
};
