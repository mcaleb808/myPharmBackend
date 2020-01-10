const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('pharmacies', [{
      id: uuid(),
      name: 'Kipharma',
      insurances: ['UAP', 'MMI', 'RSSB', 'RADIANT'],
      email: 'kipharma@gmail.com',
      telephone: '9791857537',
      pharmRep: 'Umukobwa Clarisse',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuid(),
      name: 'G. Nova',
      insurances: ['UAP', 'MMI', 'RSSB', 'RADIANT'],
      email: 'gnovapharm@gmail.com',
      telephone: '9791834457',
      pharmRep: 'Claude HIRWA',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('pharmacies', [{ role: 'admin' }]);
  }
};
