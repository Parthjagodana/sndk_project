const express = require('express')
const router = express.Router()
const authRouter = require('../routers/auth.router')
const userRouter = require('../routers/user.router')

router.use('/auth', authRouter)

router.use('/user', userRouter)

module.exports = router
