const prisma = require('../../../prisma/index.js')

const putHuntingPermission = (req, res) => {
  const licenseData = req.body.params.values;
  const employeeEdit = `${req.user.employee_last_name} ${req.user.employee_first_name} ${req.user.employee_middle_name}`;
  const id = req.body.params.values.id;
  if (id) {
    prisma.d_customer_hunting_lic.update({
      where: {
        id: id,
      },
      data: {
        id: licenseData.id,
        d_customer_id: licenseData.customerId,
        serial_license: licenseData.serialLicense,
        number_license: licenseData.numberLicense,
        issue_date: licenseData.issueDate,
        employees_authorized: licenseData.employeesAuthorized,
        issue_body: licenseData.issued,
        reestr_date: licenseData.reestrDate,
        employee_name_add: licenseData.employeeFioAdd,
        date_add: licenseData.dateAdd,
        cancelled_date: licenseData.cancelledDate,
        cancelled_ground: licenseData.cancelledGround,
        employee_name_modify: employeeEdit,
        date_modify: new Date(),
      }

    }).then(data => {
      const requestData = [{
        id: data.id,
        customerId: data.d_customer_id,
        serialLicense: data.serial_license,
        numberLicense: data.number_license,
        issueDate: data.issue_date,
        employeesAuthorized: data.employees_authorized,
        issued: data.issue_body,
        reestrDate: data.reestr_date,
        employeeFioAdd: data.employee_name_add,
        dateAdd: data.date_add,
        cancelledDate: data.cancelled_date,
        cancelledGround: data.cancelled_ground,
        employeeFioModify: employeeEdit,
        dateModify: new Date(),
      }];
      res.status(200).send(requestData);
    }).catch(err => {
      res.status(500).send({ message: err.message || "Error" });
    });
  }
  else res.status(400).json({ message: 'Id физ. лица или охот. билета не был передан' });

};

module.exports = putHuntingPermission