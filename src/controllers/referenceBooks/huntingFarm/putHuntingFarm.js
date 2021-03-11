const prisma = require('../../../../prisma/index.js')

const putHuntingFarm = (req, res) => {
  const address = req.connection.remoteAddress;
  const regExp = /::ffff:(\d{0,9}.\d{0,9}.\d{0,9}.\d{0,9})/;
  const ipUserEdit = address.match(regExp)[1];
  const huntingFarmData = req.body.params.values;
  const employeeEdit = `${req.user.employee_last_name} ${req.user.employee_first_name} ${req.user.employee_middle_name}`;
  const id = req.body.params.values.id;

  if (id) {
    prisma.s_hunting_farm.update({
      where: {
        id: id,
      },
      data: {
        id: huntingFarmData.id,
        hunting_farm_name: huntingFarmData.huntingFarmName,
        hunting_farm_area: huntingFarmData.huntingFarmArea,
        s_hunting_farm_type_id: huntingFarmData.huntingFarmTypeId,
        s_legal_person_id: huntingFarmData.legalPersonId,
        hunting_address: huntingFarmData.huntingAddress,
        hunting_farm_description: huntingFarmData.huntingFarmDescription,
        date_add: huntingFarmData.dateAdd,
        date_modify: new Date(),
        employee_name_add: huntingFarmData.employeeAdd,
        employee_name_modify: employeeEdit,
        commentt: huntingFarmData.commentt,
        ip_address_add: huntingFarmData.ipAddressAdd,
        ip_address_modify: ipUserEdit,
      }

    }).then(data => {
      const requestData = [{
        id: data.id,
        huntingFarmName: data.hunting_farm_name,
        huntingFarmArea: data.hunting_farm_area,
        huntingFarmTypeId: data.s_hunting_farm_type_id,
        legalPersonId: data.s_legal_person_id,
        huntingAddress: data.hunting_address,
        huntingFarmDescription: data.hunting_farm_description,
        dateAdd: data.date_add,
        dateModify: new Date(),
        employeeNameAdd: data.employee_name_add,
        employeeNameModify: employeeEdit,
        commentt: data.commentt,
        ipAddressAdd: data.ip_address_add,
        ipAddressModify: ipUserEdit,
      }];
      res.status(200).send(requestData);
    }).catch(err => {
      res.status(500).send({ message: err.message || "Error" });
    });
  }
  else res.status(400).json({ message: 'Id физ. лица или охот. билета не был передан' });

};

module.exports = putHuntingFarm