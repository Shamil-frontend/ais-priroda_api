// const moment = require('moment')
const prisma = require('../../../prisma/index.js')

const getHuntingLicense = (req, res) => {
  const customerId = req.query.id;
  const license = req.query.licenseId;
  if (customerId || license) {
    prisma.d_customer_hunting_lic.findMany({
      where: {
        is_remove: false,
        OR: [{
          id: license
        }, {
          d_customer_id: customerId
        }]
      },
      select: {
        id: true,
        d_customer_id: true,
        serial_license: true,
        number_license: true,
        issue_date: true,
        employees_authorized: true,
        issue_body: true,
        reestr_date: true,
        employee_name_add: true,
        date_add: true,
        cancelled_date: true,
        cancelled_ground: true,
        employee_name_modify: true,
        date_modify: true,
      }
    }).then(data => {
      const requestData = data.map(item => (
        {
          id: item.id,
          customerId: item.d_customer_id,
          serialLicense: item.serial_license,
          numberLicense: item.number_license,
          issueDate: item.issue_date,
          employeesAuthorized: item.employees_authorized,
          issued: item.issue_body,
          reestrDate: item.reestr_date,
          employeeFioAdd: item.employee_name_add,
          dateAdd: item.date_add,
          cancelledDate: item.cancelled_date,
          cancelledGround: item.cancelled_ground,
          employeeFioModify: item.employee_name_modify,
          dateModify: item.date_modify,
        }
      ))
      res.status(200).send(requestData);
    }).catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message || "Error" });
    });
  }
  else res.status(400).json({ message: 'Id охотничьего билета не найденно' });

};

module.exports = getHuntingLicense