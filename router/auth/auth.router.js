const router = require('express').Router();

const controller = require('../../controller/auth/auth.controller');
const middleware = require('../../middleware/auth/auth.middleware');
const user_middleware = require('../../middleware/user/user.middleware')

router.post('/login', middleware.isBodyValid, user_middleware.getUserDynamically('email') , controller.login);

module.exports = router;
