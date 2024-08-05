//routers = where we declare the endpoint addresses, and bind them with functional logic

const express = require('express')
const router = express.Router();
const { protect } = require('../middlewares/auth')

const userController = require('../controllers/userController')

//Create a new user
router.post('/users', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/data', protect, userController.getAllUsers);
router.put('/update/:id', userController.updateUserById);

module.exports = router;