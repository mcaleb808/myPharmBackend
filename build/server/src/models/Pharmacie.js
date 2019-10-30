'use strict';

module.exports = function (sequelize, DataTypes) {
  var Pharmacie = sequelize.define('Pharmacie', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    insurance: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  }, {});

  Pharmacie.associate = function (models) {// associations can be defined here
  };

  return Pharmacie;
};
//# sourceMappingURL=Pharmacie.js.map