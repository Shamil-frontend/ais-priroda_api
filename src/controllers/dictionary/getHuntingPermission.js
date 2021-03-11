// const moment = require('moment')
const prisma = require('../../../prisma/index.js')

const getHuntingPermission = (req, res) => {
  // const licenseId = req.query.id;
  // console.log(licenseId)
  // if (licenseId) {
  prisma.d_customer_hunting_lic_perm.findMany({
    where: {
      is_remove: false,
      // d_customer_hunting_lic_id: licenseId
    },
    select: {
      id: true,
      d_customer_hunting_lic_id: true,
      s_hunting_type_id: true,
      s_method_remove_id: true,
      serial_form: true,
      number_form: true,
      fio_given: true,
      date_given: true,
      s_hunting_farm_id: true,
      tariff_: true,
      charge_: true,
      s_employee_id: true,
      job_pos_name: true,
      s_hunting_farm_season_id: true,
      s_season_id: true,
      date_add: true,
      employee_name_add: true,
      employee_name_modify: true,
      commentt: true,
      is_remove: true,
      ip_address_add: true,
      ip_address_modify: true,
      d_customer_hunting_lic: true,
      s_employee: true,
      s_hunting_farm: true,
      s_hunting_farm_season: true,
      s_hunting_type: true,
      s_method_remove: true,
      s_season: true,
    }
  }).then(data => {
    const requestData = data.map(item => (
      {
        id: item.id,
        huntingLicenseId: item.d_customer_hunting_lic_id,
        huntingTypeId: item.s_hunting_type_id,
        methodRemoveId: item.s_method_remove_id,
        serialForm: item.serial_form,
        numberForm: item.number_form,
        fioGiven: item.fio_given,
        dateGiven: item.date_given,
        huntingFarmId: item.s_hunting_farm_id,
        tariff: item.tariff_,
        charge: item.charge_,
        employeeId: item.s_employee_id,
        jobPosName: item.job_pos_name,
        huntingFarmSeasonId: item.s_hunting_farm_season_id,
        seasonId: item.s_season_id,
        dateAdd: item.date_add,
        employeeNameAdd: item.employee_name_add,
        employeeNameModify: item.employee_name_modify,
        commentt: item.commentt,
        isRemove: item.is_remove,
        ipAddressAdd: item.ip_address_add,
        ipAddressModify: item.ip_address_modify,
        huntingLicense: item.d_customer_hunting_lic,
        employee: item.s_employee,
        huntingFarm: item.s_hunting_farm,
        huntingFarmSeason: item.s_hunting_farm_season,
        huntingType: item.s_hunting_type,
        methodRemove: item.s_method_remove,
        season: item.s_season,
      }
    ))
    res.status(200).send(requestData);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message || "Error" });
  });
  // }
  // else res.status(400).json({ message: 'По данному ID охот. билета нет разрешений' });

};

module.exports = getHuntingPermission