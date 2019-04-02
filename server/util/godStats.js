const godStats = {};
const { GodPlayerStats, God, Entry } = require('../../db');
const { datesBetween } = require('./dateManager');
const { Op } = require('sequelize');

godStats.getKDA = async (godName, options = {}) => {
    let godKDAs = [];
    let gods;
    if(!godName) gods = await God.findAll({});
    else gods = await God.findAll({where: {name: godName}});
    for(var i = 0; i < gods.length; i++){
        let god = gods[i];
        let stats = await GodPlayerStats.findAll({where: {GodId: god.id}});
        let kdaObj = stats.reduce((prev, curr) => {
            if(curr.kills.Player && curr.assists && curr.deaths){
                prev.kills += curr.kills.Player;
                prev.assists += curr.assists;
                prev.deaths += curr.deaths;
            }
            return prev;
        }, {kills: 0, deaths: 0, assists: 0});
        let kda = kdaObj.deaths ? (kdaObj.kills + kdaObj.assists) / kdaObj.deaths : -1;
        godKDAs.push({name: god.name, kda});
    }
    godKDAs = godKDAs.filter(god => god.kda)
    if(options.sorted) godKDAs.sort((a, b) => a.kda > b.kda ? -1 : 1);
    return godKDAs;
}

godStats.getGames = async (godName, options = {}) => {
    let gamesArr = [];
    let gods = await God.findAll({});
    for(var i = 0; i < gods.length; i++){
        let god = gods[i];
        let stats = await GodPlayerStats.findAll({where: {GodId: god.id}});
        let gamesPlayedObj = stats.reduce((prev, curr) => {
            if(curr.wins) prev.wins += curr.wins; 
            if(curr.losses) prev.losses += curr.losses; 
            return prev;
        }, {wins: 0, losses: 0});
        gamesPlayedObj.name = god.name;
        gamesPlayedObj.gamesPlayed = gamesPlayedObj.wins + gamesPlayedObj.losses;
        gamesPlayedObj.winLoss = (gamesPlayedObj.wins / gamesPlayedObj.losses).toFixed(2);
        gamesArr.push(gamesPlayedObj);
    }
    gamesArr = gamesArr.filter(god => god.gamesPlayed)
    if(options.sorted) gamesArr.sort((a, b) => a.gamesPlayed > b.gamesPlayed ? -1 : 1);
    return gamesArr;
}

godStats.getStats = async (godName, stats = ['timesBanned'], options = {}) => {
    let statsArr = [];
    let gods;
    if(stats.indexOf('wins') === -1) stats.push('wins');
    if(stats.indexOf('losses') === -1) stats.push('losses');
    if(!godName) gods = await God.findAll({});
    else gods = await God.findAll({where: {name: godName}});
    let entries = (await entryCollection(options)).map(entry => entry.id);
    for(var i = 0; i < gods.length; i++){
        let god = gods[i];
        let godStats = await GodPlayerStats.findAll({where: {GodId: god.id, EntryId: {$in: entries}}});
        let currStats = godStats.reduce((prev, curr) => {
            stats.forEach(stat => {
                if(stat.toLowerCase() === 'kills'){
                    prev.kills = prev.kills + curr.kills.Player || curr.kills.Player;
                } else if(stat.toLowerCase() === 'damage'){
                    prev.damage = prev.damage + curr.damage.Player || curr.damage.Player;
                } else {
                    if(stat.endsWith('_all')){
                        stat = stat.slice(0, -4);
                    }
                    if(typeof curr[stat] === 'object'){
                        for(let k in curr[stat]){
                            if(curr[stat][k]){
                                prev[`${stat}_${k}`] = prev[`${stat}_${k}`] + curr[stat][k] || curr[stat][k];
                            }
                        }
                    } else if(curr[stat]){
                        prev[stat] = prev[stat] + curr[stat] || curr[stat];
                    }
                }
            })
            return prev;
        }, {});
        if(options.perGame){
            currStats = statsPerGame(currStats); 
        }
        currStats.name = god.name;
        statsArr.push(currStats);
    }
    statsArr = statsArr.filter(god => god[stats[0]])
    if(options.sorted) statsArr.sort((a, b) => a[stats[0]] > b[stats[0]] ? -1 : 1);
    return statsArr;
}

function statsPerGame(statObj){
    let gamesPlayed = statObj.wins + statObj.losses;
    for(let k in statObj){
        if(typeof statObj[k] === 'number') statObj[k] = Number((statObj[k] / gamesPlayed).toFixed(2));
    }
    return statObj;
}

async function entryCollection(optionsObj){
    let queryObj = {
        where: {},
    }; 
    if(optionsObj.system){
        queryObj.where.system = optionsObj.system
    }
    if(optionsObj.date){
        queryObj.where.gameWindowDate = optionsObj.date;
    } 
    if(optionsObj.startDate && optionsObj.endDate){
        queryObj.where.gameWindowDate = {
            [Op.in]: datesBetween(optionsObj.startDate, optionsObj.endDate)
        }
    } 
    if(optionsObj.limit){
        queryObj.limit = optionsObj.limit;
    }

    return Entry.findAll(queryObj);
}

module.exports = godStats;