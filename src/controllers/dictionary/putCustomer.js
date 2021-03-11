const prisma = require('../../../prisma/index.js')

const putCustomer = (req, res) => {
  const customerData = req.body.params.values;
  const employeeEdit = `${req.user.employee_last_name} ${req.user.employee_first_name} ${req.user.employee_middle_name}`;
  const id = req.body.params.values.id;
  if (id) {
    prisma.d_customer.update({
      where: {
        id: id,
      },
      data: {
        last_name: customerData.lastName,
        first_name: customerData.firstName,
        middle_name: customerData.middleName,
        birth_date: customerData.birthDate,
        birth_place: customerData.birthPlace,
        doc_serial: customerData.identityDocument.serial,
        doc_number: customerData.identityDocument.number,
        doc_issue_date: customerData.identityDocument.issueDate,
        doc_issue_place: customerData.identityDocument.issuePlace,
        doc_code: customerData.identityDocument.code,
        doc_address: customerData.identityDocument.addressRegistration,
        actual_address: customerData.addressLiving,
        phone_number1: customerData.phoneNumber1,
        phone_number2: customerData.phoneNumber2,
        email: customerData.email,
        organization_name: customerData.orgName,
        organization_address: customerData.orgAddress,
        organization_email: customerData.orgEmail,
        organization_phone: customerData.orgPhone,
        employee_name_add: employeeEdit,
        date_add: new Date(),
        legal_form: customerData.legalForm,
        customer_inn: customerData.inn,
        customer_snils: customerData.snils,
        customer_gender: Number(customerData.gender),
        photo_ext: customerData.photo,
      }
    }).then(data => {
      const customerId = data.id;
      res.status(200).send(customerId);
    }).catch(err => {
      res.status(500).send({ message: err.message || "Error" });
    });
  }
  else res.status(400).json({ message: 'Id клиента или категории не был передан' });

};

module.exports = putCustomer