const prisma = require('../../../prisma/index.js')

const { getToken } = require('../../utils/token.js')
const { compare } = require('../../utils/bcrypt.js')

const login = (req, res) => {

  if (!req.body.login || !req.body.password) return res.status(400).json({ message: 'Введен неверный логин или пароль 1' });
  try {
    prisma.s_employee.findUnique({
      where: {
        employee_login: req.body.login
      }
    }).then(async (condidate) => {
      if (condidate) {
        if (await compare(req.body.password, condidate.employee_password)) {
          const userData = {
            id: condidate.id,
            lastName: condidate.employee_last_name,
            firstName: condidate.employee_first_name,
            login: condidate.employee_login,
          }
          return res.status(200).json({
            ...getToken({ ...userData })
          })
        }
        return res.status(400).json({ message: 'Введен неверный логин или пароль' });
      } else return res.status(400).json({ message: 'Введен неверный логин или пароль' });
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
}

module.exports = login