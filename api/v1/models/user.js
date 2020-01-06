import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Must provide the first name of the user'
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Must provide the last name of the user'
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: 'Email address already in use!' }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        defaultValue: 'pharmacist',
        values: ['pharmacist', 'admin']
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );
  User.associate = models => {
    User.belongsTo(models.Pharmacy, { foreignKey: 'id', as: 'pharmacyId' });
  };
  return User;
};
