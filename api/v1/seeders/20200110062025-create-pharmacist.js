const uuid = require('uuid/v4');
const { hashSync } = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      id: uuid(),
      email: 'first.user@gmail.com',
      firstName: 'First',
      lastName: 'User',
      password: hashSync('firstUser@545', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuid(),
      email: 'second.user@gmail.com',
      firstName: 'Second',
      lastName: 'User',
      password: hashSync('secondUser@545', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', [{ role: 'admin' }]);
  }
};
