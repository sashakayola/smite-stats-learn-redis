var Sequelize = require('sequelize');
var db = require('./_db');

var God = db.define('God', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	smite_id: {
		type: Sequelize.INTEGER,
		allowNull: false 
	}
});

module.exports = God;
