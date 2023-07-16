const jwt = require('jsonwebtoken')
const { jwt_secret_key, whiteListApi } = require('../config')

module.exports.authenticate = (req, res, next) => {
  // Define an array of API paths that don't require authentication
  const excludedPaths = [...whiteListApi]

  // Check if the current path is in the excludedPaths array
  if (excludedPaths.includes(req.path)) {
    return next() // Skip authentication for excluded paths
  }

  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.sendStatus(401) // Unauthorized
  }

  jwt.verify(token, jwt_secret_key, (err, user) => {
    if (err) {
      return res.sendStatus(403) // Forbidden
    }
    req.id = user.id // Attach the decoded user object to the request
    next()
  })
}
