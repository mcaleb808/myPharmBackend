const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('pharmacies', [{
      id: uuid(),
      name: 'Kipharma',
      insurances: ['UAP', 'MMI', 'RSSB', 'RADIANT'],
      email: 'mcaleb808@gmail.com',
      telephone: '9791857537',
      pharmRep: 'Umukobwa Clarisse',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('pharmacies', [{ role: 'admin' }]);
  }
};
