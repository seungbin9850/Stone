const router = require('express')();
const controller = require('./controller');
const authMiddleware = require('../../middlewares/auth');

router.post('/', authMiddleware, controller.setTodo);
router.post('/success', authMiddleware, controller.success);
router.post('/failed', authMiddleware, controller.success);

module.exports = router;