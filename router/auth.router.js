const router = require('express').Router();

const controller = require('../controller/auth.controller');
const userMiddleware = require('../middleware/user.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/login', authMiddleware.isBodyValid, userMiddleware.getUserDynamically('email'), controller.login);

router.post('/refresh', authMiddleware.checksRefreshToken, controller.refresh);

router.post('/password/forgot', userMiddleware.getUserDynamically('email'), controller.forgot_password);
router.put('/password/forgot', authMiddleware.checksActionToken, authMiddleware.checkOldPasswords, controller.forgotPasswordAfterForgot);

module.exports = router;
