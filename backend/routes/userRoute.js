//routers = where we declare the endpoint addresses, and bind them with functional logic

const express = require('express')
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth')
const { upload } = require('../middlewares/upload')
const { validate } = require('../middlewares/validate')
const { createUserSchema, loginSchema } = require('../middlewares/validationSchema');

const userController = require('../controllers/userController')

//Create a new user
router.post('/users', validate(createUserSchema), userController.createUser);
router.post('/login', validate(loginSchema), userController.loginUser);
router.get('/data', protect, authorize('Admin'), userController.getAllUsers);
router.put('/update/:id', protect, authorize('Student'), userController.updateUserById);
router.put('/delete/:id', userController.softDeleteById)
router.post('/upload', upload.single('file'), userController.uploadFile)
router.post('/upload-multiple', upload.array('files', 5), userController.uploadMultipleFiles)

router.get('/getAllStudents', protect, authorize('Admin'), userController.getAllStudents);

//this api sends email to someone
router.post('/sendEmail', userController.sendEmail)
module.exports = router;