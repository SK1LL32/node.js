const userValidator = require("../../validator/user/user.validator")
const userService = require("../../service/user/user.service");
const ApiError = require("../../error/ApiError");
const {idValidator} = require("../../validator/common.validators");


module.exports = {
  getUserDynamically: (fieldName, form = 'body', dbField = fieldName) => async (req, res, next) => {
    try {
      const fieldToSearch = req[form][fieldName];
      const user = await userService.findOneByParams({[dbField]: fieldToSearch});

      if (!user) {
        throw new ApiError('Inna not found', 404);
      }

      req.user = user;

      next()
    } catch (e) {
      next(e)
    }
  },
  checkIsEmailUnique: async (req, res, next) => {
    try {
      const {email} = req.body;
      if (!email) {
        throw new ApiError('email not found', 400);
      }
      const user = await userService.findOneByParams({email});

      if (user) {
        throw new ApiError('User with this email already exists', 409);
      }

      next()
    } catch (e) {
      next(e)
    }
  },
  isNewUserValid: async (req, res, next) => {
    try {
      const validate = userValidator.newUserValidator.validate(req.body);

      if (!validate) {
        throw new ApiError(validate.error.message, 400);
      }

      res.body = validate.value;
      next();
    } catch (e) {
      next(e)
    }
  },
  isEditUserValid: async (req, res, next) => {
    try {
      const validate = userValidator.editUserValidator.validate(req.body);

      if (!validate) {
        throw new ApiError(validate.error.message, 400);
      }

      req.body = validate.value;
    } catch (e) {
      next(e)
    }
  },
  isUserIdValid: async (req, res, next) => {
    try {
      const {userId} = req.body;

      const validate = idValidator.validate(req.body);

      if (!validate) {
        throw new ApiError(validate.error.message, 400);
      }

      req.body = validate.value;
    } catch (e) {
      next(e)
    }
  }
};
