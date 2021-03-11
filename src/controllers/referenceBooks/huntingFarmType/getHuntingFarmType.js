// const moment = require('moment')
const prisma = require('../../../../prisma/index.js')

const getHuntingFarmType = (req, res) => {

  prisma.s_hunting_farm_type.findMany({
    where: {
      is_remove: false,
    },
    select: {
      id: true,
      type_name: true,
      date_add: true,
      employee_name_add: true,
      employee_name_modify: true,
      commentt: true,
      is_remove: true,
      ip_address_add: true,
      ip_address_modify: true,
      date_modify: true,
    }
  }).then(data => {
    const requestData = data.map(item => (
      {
        id: item.id,
        name: item.type_name,
        dateAdd: item.date_add,
        employeeNameAdd: item.employee_name_add,
        employeeNameModify: item.employee_name_modify,
        commentt: item.commentt,
        ipAddressAdd: item.ip_address_add,
        ipAddressModify: item.ip_address_modify,
        dateModify: item.date_modify,
      }
    ))
    res.status(200).send(requestData);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message || "Error" });
  });
};

module.exports = getHuntingFarmType