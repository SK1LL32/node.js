const router = require('express').Router();

const controller = require('../../controller/user/user.controller');
const middleware = require('../../middleware/user/user.middleware');
const authMiddleware = require("../../middleware/auth/auth.middleware");

router.get('/', controller.getAll);
router.post('/', middleware.isNewUserValid, middleware.checkIsEmailUnique, controller.create);

router.get(
  '/userId',
  middleware.isUserIdValid,
  middleware.getUserDynamically('userId', 'params', '_id'),
  authMiddleware.checkAccessToken,
  controller.getById
);
router.put(
  '/:userId',
  middleware.isEditUserValid,
  middleware.getUserDynamically('userId', 'params', '_id'),
  middleware.isEditUserValid,
  authMiddleware.checkAccessToken,
  controller.update
);
router.delete(
  '/:userId',
  middleware.isUserIdValid,
  authMiddleware.checkAccessToken,
  controller.delete
);

module.exports = router;
