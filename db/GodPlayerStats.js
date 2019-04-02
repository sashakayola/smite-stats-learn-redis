var Sequelize = require('sequelize');
var db = require('./_db');

var GodPlayerStats = db.define('GodPlayerStats', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  timesBanned: Sequelize.INTEGER,
  wins: Sequelize.INTEGER,
  losses: Sequelize.INTEGER,
  kills: Sequelize.JSONB,
  deaths: Sequelize.INTEGER,
  assists: Sequelize.INTEGER,
  damage: Sequelize.JSONB,
  timesSurrendered: Sequelize.INTEGER,
  goldEarned: Sequelize.INTEGER,
  goldPerMinute: Sequelize.INTEGER,
  finalLevel: Sequelize.INTEGER,
  totalTime: Sequelize.INTEGER,
  structureDamage: Sequelize.INTEGER,
  campsCleared: Sequelize.INTEGER,
  wardsPlaced: Sequelize.INTEGER,
  towersDestroyed: Sequelize.INTEGER,
  items: Sequelize.JSONB,
  relics: Sequelize.JSONB,
});

module.exports = GodPlayerStats;
