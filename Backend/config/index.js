require('dotenv').config()

module.exports = {
  // Database configuration
  mongo_host: process.env.MONGO_HOST || '127.0.0.1',
  mongo_port: process.env.MONGO_PORT || 27017,
  db_name: process.env.MONGO_DB || 'sndk',

  port: process.env.PORT || 3000,
  jwt_secret_key: process.env.JWT_SECRET || 'secret-key',
  base_url: process.env.BASE_URL || 'http://localhost:3000',
  crossOrigin: process.env.CORS_CORS_TRUSTING || 'http://localhost:4200',

  whiteListApi: ['/signUp', '/signIn']
}
