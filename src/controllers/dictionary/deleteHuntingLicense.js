const prisma = require('../../../prisma/index.js')

const deleteHuntingLicense = (req, res) => {
  const id = req.query.id;
  if (id) {
    prisma.d_customer_hunting_lic.update({
      where: {
        id: id,
      },
      data: {
        is_remove: true
      },
      select: {
        id: true
      }
    }).then((data) => {
      res.status(200).send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).send({ message: err.message || "Error" });
    });
  } else res.status(400).send({ message: "Нет охотничьих билетов по этому ID" });
};

module.exports = deleteHuntingLicense