/* eslint-disable implicit-arrow-linebreak */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('pharmacies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: null
      },
      insurances: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      telephone: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      pharmRep: {
        type: Sequelize.STRING,
        allowNull: false
      },
      repId: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' }
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'rejected', 'approved'],
        defaultValue: 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: { type: Sequelize.DATE }
    }),
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('pharmacies')
};
