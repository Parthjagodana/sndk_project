const User = require('../models/user')
const bcrypt = require('bcryptjs')
const fs = require('fs')

const getAllUser = async (req, res) => {
  try {
    const { search, isActive, page, limit } = req.query

    // Prepare the search query
    const query = {}

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
      // Add more fields to search by if needed
    }

    if (isActive) {
      if (isActive == '0') query.status = false
      if (isActive == '1') query.status = true
    }

    // Set up pagination options
    const pageNumber = parseInt(page, 10) || 1
    const pageSize = parseInt(limit, 10) || 10
    const skip = (pageNumber - 1) * pageSize

    // Perform the search with pagination
    const users = await User.find(query).skip(skip).limit(pageSize)

    res.json(users)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const updateUser = async (req, res) => {
  try {
    const personInfo = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "This user doesn't exists!!!" })
    }

    let profileImage = null
    if (req?.file?.filename) {
      profileImage = '/public/uploads/' + req.file.filename
    }

    if (
      req.file != undefined &&
      req.file.filename != undefined &&
      user.profileImage != ''
    ) {
      // Check if the image file exists
      fs.access(`./${user.profileImage}`, fs.constants.F_OK, (err) => {
        if (err) {
          console.error('Image file does not exist.')
          return
        }

        // Remove the image file
        fs.unlink(`./${user.profileImage}`, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error removing image file:', unlinkErr)
          }
        })
      })
    }

    const updateObj = {
      firstName: personInfo.firstName,
      email: personInfo.email,
      status: personInfo.status
    }

    if (profileImage) updateObj.profileImage = profileImage

    await User.findByIdAndUpdate(req.params.id, updateObj)

    return res.json({
      status: true,
      message: 'User data updated successfully ... '
    })
  } catch (error) {
    console.log('error', error)
    return res
      .status(500)
      .send({ status: false, message: 'Internal server error' })
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "This user doesn't exists!!!" })
    }

    const matchPassword = bcrypt.compareSync(
      req.body.oldPassword,
      user.passwordHash
    )

    if (!matchPassword) {
      return res
        .status(400)
        .send({ status: false, message: "Old password doesn't match !!!" })
    }
    const newPassword = bcrypt.hashSync(req.body.password, 10)

    await User.findByIdAndUpdate(req.params.id, {
      passwordHash: newPassword
    })

    return res.json({
      status: true,
      message: 'Password updated successfully ... '
    })
  } catch (error) {
    console.log('error', error)
    return res
      .status(500)
      .send({ status: false, message: 'Internal server error' })
  }
}

module.exports = {
  getAllUser,
  updateUser,
  updatePassword
}
