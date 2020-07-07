const router = require('express')();
const controller = require('./controller');
const authMiddleware = require('../../middlewares/auth');

router.get('/', authMiddleware, controller.showMain);

module.exports = router