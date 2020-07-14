const router = require('express')();
const controller = require('./controller');
const authMiddleware = require('../../middlewares/auth');

router.post('/', authMiddleware, controller.setTodo);
router.get('/success', authMiddleware, controller.success);
router.get('/failed', authMiddleware, controller.fail);

module.exports = router;