const bcrypt = require('bcrypt')

const compare = (password, hash) => bcrypt.compare(password, hash)

module.exports = { compare };