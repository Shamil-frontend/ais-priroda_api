const express = require('express')
const passport = require('passport')
const login = require('../controllers/login/login.js')
const refreshToken = require('../controllers/login/refreshToken.js')

const router = express.Router()

router.post('/login', login)
router.post('/refreshToken', refreshToken)

module.exports = router;