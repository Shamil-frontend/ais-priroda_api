const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')

const loginRoutes = require('./routs/login.js')
const customer = require('./routs/customer.js')
const reference = require('./routs/reference.js')

const middlewarePassportJs = require('./middleware/passports.js')

const app = express()

// Support modules
app.use(require("morgan")("dev"))
app.use(passport.initialize())
middlewarePassportJs(passport)
app.use(require('cors')())
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))


// Routs 
app.use('/api/account', loginRoutes) // api/account
app.use('/api/dictionary', customer) // api/dictionary
app.use('/api/reference', reference) // api/dictionary

module.exports = app; 