const router = require('express')();
const controller = require('./controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/refresh', controller.refresh);

module.exports = router;