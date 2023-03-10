const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize(
  process.env.DB_POSTGRES_DATABASE, 
  process.env.DB_POSTGRES_USERNAME, 
  process.env.DB_POSTGRES_PASSWORD, 
  {
    host: process.env.DB_POSTGRES_HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  {
    logging: console.log,   
  }
);

sequelize.authenticate()
  .then(() => console.log('connection has been established successfully.'))
  .catch(error => console.log('unable to connect to the database:', error))

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.User = require("../model/account.js")(DataTypes, sequelize)

module.exports = db;