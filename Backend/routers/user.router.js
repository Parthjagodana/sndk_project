const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { authenticate } = require('../middleware/auth')
const fileUploadMiddleware = require('../middleware/multer')

router.use(authenticate)

// Get All Users
router.get('/', userController.getAllUser)

// Update user
router.put(
  '/:id',
  fileUploadMiddleware.single('file'),
  userController.updateUser
)

// Change password
router.put('/changePassword/:id', userController.updatePassword)

module.exports = router
