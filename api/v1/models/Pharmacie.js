module.exports = (sequelize, DataTypes) => {
  const Pharmacie = sequelize.define(
    'Pharmacie',
    {
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
    },
    {}
  );
  Pharmacie.associate = (_models) => {
    // associations can be defined here
  };
  return Pharmacie;
};
