// const moment = require('moment')
const prisma = require('../../../prisma/index.js')

const getCustomerData = (req, res) => {
  const customerId = req.query.id;
  if (customerId) {
    prisma.d_customer.findFirst({
      where: {
        id: customerId
      },
      select: {
        id: true,
        last_name: true,
        first_name: true,
        middle_name: true,
        birth_date: true,
        birth_place: true,
        doc_serial: true,
        doc_number: true,
        doc_issue_date: true,
        doc_issue_place: true,
        doc_code: true,
        doc_address: true,
        actual_address: true,
        phone_number1: true,
        phone_number2: true,
        email: true,
        organization_name: true,
        organization_address: true,
        organization_email: true,
        organization_phone: true,
        employee_name_add: true,
        date_add: true,
        legal_form: true,
        customer_inn: true,
        customer_snils: true,
        customer_gender: true,
        photo_ext: true,
      }
    }).then(data => {
      const requestData = {
        id: data.id,
        lastName: data.last_name,
        firstName: data.first_name,
        middleName: data.middle_name,
        birthDate: data.birth_date,
        birthPlace: data.birth_place,
        identityDocument: {
          serial: data.doc_serial,
          number: data.doc_number,
          issueDate: data.doc_issue_date,
          issuePlace: data.doc_issue_place,
          code: data.doc_code,
          addressRegistration: data.doc_address,
        },
        addressLiving: data.actual_address,
        phoneNumber1: data.phone_number1,
        phoneNumber2: data.phone_number2,
        email: data.email,
        orgName: data.organization_name,
        orgAddress: data.organization_address,
        orgEmail: data.organization_email,
        orgPhone: data.organization_phone,
        employeeFioAdd: data.employee_name_add,
        dateAdd: data.date_add,
        legalForm: data.legal_form,
        inn: data.customer_inn,
        snils: data.customer_snils,
        gender: data.customer_gender,
        photo: data.photo_ext,
      }
      res.status(200).send(requestData);
    }).catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message || "Error" });
    });
  }
  else res.status(400).json({ message: 'Id физического лица не найденно' });

};

module.exports = getCustomerData