const { getToken, decodeToken } = require('../../utils/token.js')

const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken
  if (!!refreshToken) {
    const user = decodeToken(refreshToken)
    if (user) return res.status(200).json({ ...getToken({ ...user.data }) })
    else return res.status(400).json({ message: 'Ошибка в создании токена доступа' })
  }
  return res.status(401).json({ message: 'Токен не указан' })
}

module.exports = refreshToken;