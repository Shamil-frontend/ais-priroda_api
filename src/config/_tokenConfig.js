// const header = { "alg": "HS256", "typ": "JWT"}

const tokenConfig = {
  privateKey: "!QwerFbbgfg54$%^456trhyrth$%#^T$%tryrty$%#^#$%retret#$%#$%trgfdbgfhgjyhhg",
  options: {
    expiresIn: 3600,
    subject: "auth"
  },
  privateKeyRefreshToken: "!QwerFbbgfg54$%^456trhyrth$%#^T$%tryrty$%#^#$%retret#$%#$%trgfdbgfhgjyhhg$%ERDSF#R",
};

module.exports = tokenConfig