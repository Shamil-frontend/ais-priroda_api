// const moment = require('moment')
const prisma = require('../../../../prisma/index.js')

const getHuntingFarm = (req, res) => {

  prisma.s_hunting_farm.findMany({
    where: {
      is_remove: false,
    },
    select: {
      id: true,
      hunting_farm_name: true,
      hunting_farm_area: true,
      hunting_address: true,
      hunting_farm_description: true,
      date_add: true,
      date_modify: true,
      employee_name_add: true,
      employee_name_modify: true,
      commentt: true,
      ip_address_add: true,
      ip_address_modify: true,
      s_hunting_farm_type: {
        select: {
          type_name: true,
        }
      },
      s_legal_person: {
        select: {
          legal_name: true,
        }
      },
    }
  }).then(data => {
    const requestData = data.map(item => (
      {
        id: item.id,
        name: item.hunting_farm_name,
        area: item.hunting_farm_area,
        huntingFarmType: item.s_hunting_farm_type?.type_name,
        legalPersonName: item.s_legal_person?.legal_name,
        address: item.hunting_address,
        description: item.hunting_farm_description,
        dateAdd: item.date_add,
        dateModify: item.date_modify,
        employeeNameAdd: item.employee_name_add,
        employeeNameModify: item.employee_name_modify,
        commentt: item.commentt,
        ipAddressAdd: item.ip_address_add,
        ipAddressModify: item.ip_address_modify,
      }
    ))
    res.status(200).send(requestData);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message || "Error" });
  });
};

module.exports = getHuntingFarm