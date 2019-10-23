require('dotenv').config();
module.exports = {
  development: {
    logging: false,
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
  test: {
    logging: false,
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
  production: {
    logging: false,
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
