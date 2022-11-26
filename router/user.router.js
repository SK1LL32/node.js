const router = require('express').Router();
const controller = require('../controller/user/user.controller');
const mdlr = require('../middleware/user/user.middleware');

router.get('/', controller.getAll);
router.post('/', mdlr.isNewUserValid, mdlr.checkIsEmailUnique, controller.create);

router.get('/:userId', controller.getById);
router.put('/:userId', mdlr.isEditUserValid, controller.update);
router.delete('/:userId', controller.delete);


module.exports = router;
