const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = './public/uploads/'
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop()
    cb(null, Date.now() + '.' + fileExtension)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg and .jpeg files are allowed!'))
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})

module.exports = upload
