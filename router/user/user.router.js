const router = require('express').Router();

const controller = require('../../controller/user/user.controller');
const middleware = require('../../middleware/user/user.middleware');


router.get('/', controller.getAll);
router.post('/', middleware.isNewUserValid, middleware.checkIsEmailUnique, controller.create);

router.get('/userId', middleware.isUserIdValid, middleware.getUserDynamically('userId', 'params', '_id'),controller.getById);
router.put('/:userId', middleware.isEditUserValid, middleware.getUserDynamically('userId', 'params', '_id'),middleware.isEditUserValid, controller.update);
router.delete('/:userId', middleware.isUserIdValid, controller.delete);

module.exports = router;
