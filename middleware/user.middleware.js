const userValidator = require('../validator/user.validator');
const { userService } = require('../service');
const ApiError = require('../error/ApiError');
const commonValidator = require('../service/common.service');

module.exports = {
  getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
    try {
      const fieldToSearch = req[from][fieldName];

      const user = await userService.findByOneParams({ [dbField]: fieldToSearch });

      if (!user) {
        throw new ApiError('User not found', 404);
      }

      req.user = user;
      next()
    } catch (e) {
      next(e);
    }
  },

  checkIsEmailUnique: async (req, res, next) => {
    try {
      const { email, phone } = req.body;

      if (!email) {
        throw new ApiError('email not walid', 409);
      }

      const user = await userService.findByOneParams({ email });

      if (user) {
        throw new ApiError('User with this email already exist', 409);
      }

      const userPhone = await userService.findByOneParams({ phone });

      if (userPhone) {
        throw new ApiError('User with this email already exist', 409);
      }

      next()
    } catch (e) {
      next(e)
    }
  },

  isNewUserValid: async (req, res, next) => {
    try {
      const validate = await userValidator.newUserValid.validate(req.body);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      req.body = validate.value;
      next();
    } catch (e) {
      next(e)
    }
  },

  isEditUserValid: async (req, res, next) => {
    try {
      let validate = userValidator.editUserValid.validate(req.body);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      req.body = validate.value;
      next()
    } catch (e) {
      next(e)
    }
  },

  isUserIdValid: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const validate = commonValidator.idValidator.validate(userId);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

}