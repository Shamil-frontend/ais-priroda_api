const { Strategy, ExtractJwt } = require('passport-jwt')
const tokenConfig = require('../config/_tokenConfig.js')
const { PrismaClient } = require('@prisma/client')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: tokenConfig.privateKey
}

const prisma = new PrismaClient()

const middlewarePassportJs = (passport) => {
  passport.use(
    new Strategy(options, (payload, done) => {
      prisma.s_employee.findUnique({
        where: {
          employee_login: payload.data.login
        },
      }).then((data) => {
        return done(null, data);
      }).catch(() => {
        return done({
          message: "Error 404, token not found!"
        }, false);
      })
    })
  )
}

module.exports = middlewarePassportJs;