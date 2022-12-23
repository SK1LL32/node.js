const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middleware');
const controller = require('../controller/auth.controller');

router.post('/login', authMiddleware.isBodyValid, userMiddleware.getUserDynamically('email'), controller.login);

router.post('/refresh', authMiddleware.checksRefreshToken, controller.refresh);

router.post('/password/forgot', userMiddleware.getUserDynamically('email'), controller.forgot_password);
router.put('/password/forgot', authMiddleware.checksActionToken, authMiddleware.checkOldPasswords, controller.forgotPasswordAfterForgot);

module.exports = router;
