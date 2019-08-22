const Sequelize = require('sequelize')

const config = {
  database: 'chipadvisor',
  username: 'chipadvisor',
  password: 'chipadvisor',
  host: 'localhost'
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, dialect: 'postgres' }
)

module.exports = sequelize
