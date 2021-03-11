const prisma = require('../../../prisma/index.js')
const Fuse = require('fuse.js')

const optionsSearch = {
  minMatchCharLength: 5,
  includeScore: true,
  // findAllMatches: true,
  location: 0,
  distance: 100,
  threshold: 0.7,
  keys: [
    "last_name",
    "first_name",
    "middle_name",
    "phone_number1",
    "email",
  ]
};

const getCustomersSearch = (req, res) => {
  const searchText = req.query.phrase;
  // const phrase = searchText.split(' ').length;
  if (searchText) {
    prisma.d_customer.findMany({
      where: {
        is_remove: false
      }
    }).then(data => {
      const fuse = new Fuse(data, optionsSearch);
      const results = fuse.search(searchText);
      const minScore = Math.min(...results.map(it => it.score));
      // console.log(results)
      // console.log(minScore)
      // console.log(results.map(it => it.score))
      if (results.length) {
        const requestData = results.filter(it => it.score === minScore).map(item => (
          {
            id: item.item.id,
            lastName: item.item.last_name,
            firstName: item.item.first_name,
            middleName: item.item.middle_name,
            addressLiving: item.item.actual_address,
            email: item.item.email,
            phone: item.item.phone_number1,
          }
        ));
        res.status(200).send(requestData);
      } else {
        res.status(200).send([]);
      }

    }).catch(err => {
      res.status(500).send({ message: err.message || "Error" });
    });
  }
  else res.status(400).json({ message: 'Отсутствует текст в строке поиска' });
}

module.exports = getCustomersSearch