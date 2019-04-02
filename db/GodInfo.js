var Sequelize = require('sequelize');
var db = require('./_db');

var GodInfo = db.define('GodInfo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patchNumber: Sequelize.STRING,
  info: {
    type: Sequelize.JSONB
  }
});

module.exports = GodInfo;

