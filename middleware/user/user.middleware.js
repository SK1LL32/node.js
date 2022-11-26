const ApiError = require('../../error/ApiError');
const {userService} = require('../../service');
const userValidator = require('../../validator/user/user.validator');

module.exports = {
  // checkIsUserExist: async (req, res, next) => {
  //   try {
  //     const {userId} = req.params;
  //     const user = await userService.findOneByParams({id: userId});
  //
  //     if (!user) {
  //       throw new ApiError('404 not found', 404);
  //     }
  //
  //     req.user = user
  //   } catch (e) {
  //     next(e)
  //   }
  // },
  // getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
  //   try {
  //     const fieldToSearch = req[from][fieldName];
  //
  //     const user = await userService.findByParams({[dbField]: fieldToSearch});
  //
  //     if (!user) {
  //       throw new ApiError('Inna not found', 404);
  //     }
  //
  //     req.user = user;
  //
  //     next()
  //   } catch (e) {
  //     next(e);
  //   }
  // },
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

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      req.body = validate.value;

      next()
    } catch (e) {
      next(e);
    }
  },

  isEditUserValid: async (req, res, next) => {
    try {
      let validate = userValidator.editUserValidator.validate(req.body);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      req.body = validate.value;

      next()
    } catch (e) {
      next(e);
    }
  },
};
