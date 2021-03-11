const prisma = require('../../../prisma/index.js')

const deleteCustomer = (req, res) => {
  const id = req.query.id;

  if (id) {
    prisma.d_customer.update({
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
      prisma.d_customer_hunting_lic.update({
        where: {
          d_customer: {
            id: data.id
          },
          data: {
            is_remove: true
          },
        }
      }).then((data) => {
        res.status(200).send(data);
      }).catch(err => {
        return res.status(500).send({ message: err.message || "Error" });
      })
    }).catch(err => {
      console.log(err);
      return res.status(500).send({ message: err.message || "Error" });
    });
  } else res.status(400).send({ message: "Id компании или наименование категории не заполненно" });
};

module.exports = deleteCustomer