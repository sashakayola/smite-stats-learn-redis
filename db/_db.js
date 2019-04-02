var Sequelize = require('sequelize');

var db = new Sequelize(process.env.HEROKU_POSTGRESQL_RED_URL || process.env.DATABASE_URL || 'postgres://localhost:5432/SmiteVizDev', {
  dialect: 'postgres',
  logging: false
});

module.exports = db;