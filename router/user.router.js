const router = require('express').Router();

const controller = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');
const authMiddleware = require('../middleware/auth.middleware');

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

module.exports = router;
