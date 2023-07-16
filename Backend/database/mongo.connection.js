const config = require('../config')
const mongoose = require('mongoose')

// Connecting to the database
module.exports = {
  async connect () {
    await mongoose
      .connect(
        `mongodb://${config.mongo_host}:${config.mongo_port}/${config.db_name}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then(() => {
        console.log('Successfully connected to the database')
      })
      .catch((err) => {
        console.log('Could not connect to the database. Exiting now...', err)
        process.exit()
      })
  }
}
