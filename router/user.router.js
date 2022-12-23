const router = require('express').Router();

const controller = require('../controller/user.controller');
const { userMiddleware, authMiddleware, fileMiddleware } = require('../middleware');

router.get('/', controller.getAll);
router.post('/', userMiddleware.isNewUserValid, userMiddleware.checkIsEmailUnique, controller.create);

router.get(
  '/:userId',
  userMiddleware.isUserIdValid,
  authMiddleware.checksAccessToken,
  userMiddleware.getUserDynamically('userId', 'params', '_id'),
  controller.getById
);
router.put(
  '/:userId',
  userMiddleware.isEditUserValid,
  authMiddleware.checksAccessToken,
  userMiddleware.getUserDynamically('userId', 'params', '_id'),
  controller.update
);
router.delete(
  '/:userId',
  userMiddleware.isUserIdValid,
  authMiddleware.checksAccessToken,
  controller.delete
);

router.patch(
  '/:userId/avatar',
  fileMiddleware.checkUploadImage,
  userMiddleware.isUserIdValid,
  userMiddleware.getUserDynamically('userId', 'params', '_id'),
  controller.uploadAvatar
);

module.exports = router;
