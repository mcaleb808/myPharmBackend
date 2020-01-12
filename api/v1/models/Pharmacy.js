module.exports = (sequelize, DataTypes) => {
  const Pharmacy = sequelize.define(
    'Pharmacy',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Must provide the name of this Pharmacy'
        }
      },
      insurances: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      telephone: {
        type: DataTypes.STRING(16),
        allowNull: {
          args: false,
          msg: 'Must provide telephone number of this Pharmacy'
        },
        unique: { args: true, msg: 'Telephone number is already in use!' }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: 'Email address already in use!' }
      },
      pharmRep: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Must provide the name of Pharmaceutical Representative'
        }
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'rejected', 'approved'],
        defaultValue: 'pending'
      }
    },
    {
      tableName: 'pharmacies',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] }
      },
      timestamps: true,
      paranoid: true,
      scopes: {
        pending: {
          where: { status: 'pending' },
          returning: true,
          validate: true,
          paranoid: true,
        },
      }
    }
  );
  Pharmacy.associate = ({ User }) => {
    Pharmacy.belongsTo(User, { foreignKey: 'repId', as: 'owner' });
  };
  return Pharmacy;
};
