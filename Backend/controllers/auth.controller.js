// eslint-disable-next-line no-undef
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const config = require('../config')
const jwt = require('jsonwebtoken')

// Create a new User
const signUp = async (req, res) => {
  try {
    const personInfo = req.body

    const user = await User.findOne({ email: req.body.email })

    if (user) {
      return res
        .status(400)
        .send({ status: false, message: 'This email already existed.' })
    }

    let profileImage = null
    if (req?.file?.filename) {
      profileImage = '/public/uploads/' + req.file.filename
    }

    const newUser = new User({
      firstName: personInfo.firstName,
      lastName: personInfo.lastName,
      email: personInfo.email,
      status: personInfo.status,
      passwordHash: bcrypt.hashSync(personInfo.password, 10),
      profileImage
    })

    const insertUser = await newUser.save()
    if (!insertUser) {
      return res
        .status(404)
        .send({ status: false, message: 'User cannot be created' })
    }

    return res.send(insertUser)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// Login User
const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    const secret = config.jwt_secret_key

    if (!user) {
      return res
        .status(400)
        .send({ status: false, message: 'User with given Email not found' })
    }

    if (user.status === false) {
      return res
        .status(401)
        .send({ status: false, message: 'User is Inactive!' })
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          id: user._id
        },
        secret,
        { expiresIn: '1d' }
      )
      return res.status(200).send({ user: user.email, token })
    } else {
      return res.status(400).send({ message: 'Password is mismatch' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  signUp,
  signIn
}
