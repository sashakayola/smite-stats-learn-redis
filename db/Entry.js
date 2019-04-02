var Sequelize = require('sequelize');
var db = require('./_db');

var Entry = db.define('Entry', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numberOfGames: Sequelize.INTEGER,
  matchIds: Sequelize.ARRAY(Sequelize.INTEGER),
  gameWindowDate: Sequelize.STRING,
  gameWindowHour: Sequelize.INTEGER,
  currentPatch: Sequelize.STRING,
  system: Sequelize.STRING
});

module.exports = Entry;


