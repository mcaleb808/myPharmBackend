const uuid = require('uuid/v4');
const { hashSync } = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      id: uuid(),
      email: 'pacifique.musigwa@gmail.com',
      firstName: 'MUSIGWA',
      lastName: 'Pacifique',
      password: hashSync(process.env.ADMIN_PASSWORD_1, 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }, {
      id: uuid(),
      email: 'mcaleb808.musigwa@gmail.com',
      firstName: 'MUGISHA',
      lastName: 'Caleb',
      password: hashSync(process.env.ADMIN_PASSWORD_2, 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', [{ role: 'admin' }]);
  }
};
