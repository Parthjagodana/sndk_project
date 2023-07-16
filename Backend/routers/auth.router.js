const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const fileUploadMiddleware = require('../middleware/multer')

// signUp
router.post(
  '/signUp',
  fileUploadMiddleware.single('file'),
  authController.signUp
)

// signIn
router.post('/signIn', authController.signIn)

module.exports = router
