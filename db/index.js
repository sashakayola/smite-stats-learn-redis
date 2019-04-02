const db = require('./_db');

const God = require('./God');
const GodPlayerStats = require('./GodPlayerStats');
const Entry = require('./Entry');
const GodInfo = require('./GodInfo');

GodInfo.belongsTo(God);
God.hasOne(GodInfo);
GodPlayerStats.belongsTo(God);
Entry.hasMany(GodPlayerStats);

module.exports = { db, God, GodPlayerStats, Entry, GodInfo };
