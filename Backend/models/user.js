const mongoose = require('mongoose')
const { base_url } = require('../config')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    profileImage: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        if (doc.profileImage) ret.profileImage = base_url + doc.profileImage
      }
    }
  }
)

module.exports = mongoose.model('User', userSchema)
