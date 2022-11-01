const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.post('/register', usersController.signUp);
router.post('/login', usersController.login);
router.post('/', usersController.getSingleUser);
router.post('/logout', usersController.logout);

module.exports = router;
