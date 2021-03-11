const prisma = require('../../../../prisma/index.js')

const postHuntingFarm = (req, res) => {
  const address = req.connection.remoteAddress;
  const regExp = /::ffff:(\d{0,9}.\d{0,9}.\d{0,9}.\d{0,9})/;
  const ipUserAdd = address.match(regExp)[1];
  const employeeAdd = `${req.user.employee_last_name} ${req.user.employee_first_name} ${req.user.employee_middle_name}`;
  const huntingFarmData = req.body.params.values;

  prisma.s_hunting_farm.create({
    data: {
      hunting_farm_name: huntingFarmData.name,
      hunting_farm_area: huntingFarmData.area,
      s_hunting_farm_type_id: huntingFarmData.huntingFarmTypeId.value,
      s_legal_person_id: huntingFarmData.legalPersonId.value,
      hunting_address: huntingFarmData.address,
      hunting_farm_description: huntingFarmData.description,
      date_add: new Date(),
      date_modify: null,
      employee_name_add: employeeAdd,
      employee_name_modify: "",
      commentt: huntingFarmData.commentt,
      ip_address_add: ipUserAdd,
      ip_address_modify: "",
    }
  }).then(data => {
    const huntingFarmId = data.id;
    res.status(200).send(huntingFarmId);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message || "Error" });
  });
};

module.exports = postHuntingFarm