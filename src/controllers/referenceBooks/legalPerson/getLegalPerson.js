// const moment = require('moment')
const prisma = require('../../../../prisma/index.js')

const getLegalPerson = (req, res) => {

  prisma.s_legal_person.findMany({
    // where: {
    //   OR: [{
    //     id: license
    //   }, {
    //     d_customer_id: customerId
    //   }]
    // },
    select: {
      id: true,
      legal_name: true,
      legal_address: true,
      actual_address: true,
      inn: true,
      kpp: true,
      okved: true,
      ogrn: true,
      head_fio: true,
      phone_number1: true,
      phone_number2: true,
      e_mail: true,
      s_bank_id: true,
      bank_account: true,
      date_contract: true,
      egrul_date: true,
      s_services_sub_type_recipient_id: true,
    }
  }).then(data => {
    const requestData = data.map(item => (
      {
        id: item.id,
        name: item.legal_name,
        address: item.legal_address,
        actualAddress: item.actual_address,
        inn: item.inn,
        kpp: item.kpp,
        okved: item.okved,
        ogrn: item.ogrn,
        headFio: item.head_fio,
        phoneNumber1: item.phone_number1,
        phoneNumber2: item.phone_number2,
        email: item.e_mail,
        bankId: item.s_bank_id,
        bankAccount: item.bank_account,
        dateContract: item.date_contract,
        egrulDate: item.egrul_date,
        typeRecipientId: item.s_services_sub_type_recipient_id,
      }
    ))
    res.status(200).send(requestData);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message || "Error" });
  });
};

module.exports = getLegalPerson