const { Router } = require('express');
const authController = require('../controler/authControler');
const router = Router();
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/all', authController.getUsers);
// router.get('/user', auth, authController.get_user);

module.exports = router;