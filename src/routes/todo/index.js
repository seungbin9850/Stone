const router = require('express')();
const controller = require('./controller');
const authMiddleware = require('../../middlewares/auth');

router.post('/', authMiddleware, controller.setTodo);

module.exports = router;