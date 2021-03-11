const jwt = require('jsonwebtoken')
const tokenConfig = require('../config/_tokenConfig.js')

const getToken = (data) => ({
  token: jwt.sign({ data }, tokenConfig.privateKey, tokenConfig.options),
  refreshToken: jwt.sign({ data }, tokenConfig.privateKeyRefreshToken, tokenConfig.options)
})

const decodeToken = (token) => jwt.decode(token);

module.exports = { getToken, decodeToken };