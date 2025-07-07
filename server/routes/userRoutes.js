const express = require('express');

const { register, login, updateUser, fetchAllUsers, fetchLoggedInUser } = require('../controllers/userController');
const { isAuthorizedUser } = require('../middlewares/authorization');

const router = express.Router();

//public routes
router.post('/login', login);
router.post('/register', register);

//protected routes
router.get('/', isAuthorizedUser, fetchAllUsers);
router.get('/loggedInUser', isAuthorizedUser, fetchLoggedInUser);
router.put('/update', isAuthorizedUser, updateUser);

module.exports = router;