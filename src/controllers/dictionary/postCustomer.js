const prisma = require('../../../prisma/index.js')

const postCustomer = (req, res) => {
  const customerData = req.body.params.values;
  const employeeAdd = `${req.user.employee_last_name} ${req.user.employee_first_name} ${req.user.employee_middle_name}`;
  if (customerData) {
    prisma.d_customer.create({
      data: {
        last_name: customerData.lastName.trim(),
        first_name: customerData.firstName.trim(),
        middle_name: customerData.middleName.trim(),
        birth_date: customerData.birthDate,
        birth_place: customerData.birthPlace,
        doc_serial: customerData.identityDocument.serial,
        doc_number: customerData.identityDocument.number,
        doc_issue_date: customerData.identityDocument.issueDate,
        doc_issue_place: customerData.identityDocument.issuePlace,
        doc_code: customerData.identityDocument.code,
        doc_address: customerData.identityDocument.addressRegistration,
        actual_address: customerData.addressLiving,
        phone_number1: customerData.phoneNumber1.trim(),
        phone_number2: customerData.phoneNumber2.trim(),
        email: customerData.email.trim(),
        organization_name: customerData.orgName,
        organization_address: customerData.orgAddress,
        organization_email: customerData.orgEmail,
        organization_phone: customerData.orgPhone,
        employee_name_add: employeeAdd,
        date_add: new Date(),
        legal_form: customerData.legalForm,
        customer_inn: customerData.inn,
        customer_snils: customerData.snils,
        customer_gender: Number(customerData.gender),
        photo_ext: customerData.photo,
        d_customer_hunting_lic: {
          create: customerData?.huntingLicenseData ? (
            [
              {
                serial_license: customerData.huntingLicenseData.serialLicense,
                number_license: customerData.huntingLicenseData.numberLicense,
                issue_date: customerData.huntingLicenseData.issueDate,
                employees_authorized: customerData.huntingLicenseData.employeesAuthorized,
                issue_body: customerData.huntingLicenseData.issued,
                reestr_date: customerData.huntingLicenseData.reestrDate,
                cancelled_date: null,
                cancelled_ground: '',
                employee_name_add: employeeAdd,
                date_add: new Date(),
                employee_name_modify: '',
                date_modify: null,
                is_remove: false
              }
            ]
          ) : []
        }
      }
    }).then(data => {
      const customerId = data.id;
      res.status(200).send(customerId);
    }).catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message || "Error" });
    });
  }
  else res.status(400).json({ message: 'Один из обязательных параметров не задан' });

};

module.exports = postCustomer