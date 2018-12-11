const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4',
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const Card = sequelize.define('Card', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  name: Sequelize.STRING(50),
  digits: {
    type: Sequelize.BIGINT(16),
    unique: true,
  },
  cvc: Sequelize.INTEGER(3),
  expiresAt: Sequelize.DATE,
  balance: Sequelize.DECIMAL(10, 2),
  currency: Sequelize.STRING(3),
});

sequelize.sync();

module.exports = {
  Card,
};
