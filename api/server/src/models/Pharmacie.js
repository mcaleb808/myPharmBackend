'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pharmacie = sequelize.define(
    'Pharmacie',
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING
    },
    {}
  );
  Pharmacie.associate = function(models) {
    // associations can be defined here
  };
  return Pharmacie;
};
