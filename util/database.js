const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'Dobby@888', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;