const prisma = require('../../../prisma/index.js')

const postHuntingPermission = (req, res) => {
  const licenseData = req.body.params.values;
  const employeeAdd = `${req.user.employee_last_name} ${req.user.employee_first_name} ${req.user.employee_middle_name}`;
  if (licenseData) {
    prisma.d_customer_hunting_lic.create({
      data: {
        d_customer_id: licenseData.customerId,
        serial_license: licenseData.serialLicense,
        number_license: licenseData.numberLicense,
        issue_date: licenseData.issueDate,
        employees_authorized: licenseData.employeesAuthorized,
        issue_body: licenseData.issued,
        reestr_date: licenseData.reestrDate,
        employee_name_add: employeeAdd,
        date_add: new Date(),
        cancelled_date: licenseData.cancelledDate,
        cancelled_ground: licenseData.cancelledGround,
        employee_name_modify: '',
        date_modify: null,
      }
    }).then(data => {
      const huntingLicenseId = data.id;
      res.status(200).send(huntingLicenseId);
    }).catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message || "Error" });
    });
  }
  else res.status(400).json({ message: 'Один из обязательных параметров не задан' });

};

module.exports = postHuntingPermission