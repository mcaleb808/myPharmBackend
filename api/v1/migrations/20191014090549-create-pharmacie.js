module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Pharmacies', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    },
    insurance: { type: Sequelize.ARRAY(Sequelize.STRING) },
    logo: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Pharmacies')
};
