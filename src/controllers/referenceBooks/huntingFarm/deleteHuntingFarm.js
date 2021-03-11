const prisma = require('../../../../prisma/index.js')

const deleteHuntingFarm = (req, res) => {
  const id = req.query.id;
  if (id) {
    prisma.s_hunting_farm.update({
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
  } else res.status(400).send({ message: "Нет охот. хозяйства по этому ID" });
};

module.exports = deleteHuntingFarm