const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config')
const routingHandler = require('./routers/router')
const { connect } = require('./database/mongo.connection')

const app = express()

// Set cors configuration
app.use(cors({ origin: config.crossOrigin, credentials: true }))

// Middleware
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.use('/public', express.static('public'))

// Root route of express app
app.get('/', (req, res) => {
  res.send('Hello SNDK')
})

// handle routes
app.use(routingHandler)

app.listen(config.port, async () => {
  await connect()
  console.log(`Server is running on port ${config.port}.`)
})
