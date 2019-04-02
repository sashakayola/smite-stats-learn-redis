const redis = require('redis'); 
const client = redis.createClient(process.env.REDIS_URL); 

module.exports = {
    getCache: function(req, res, next){
        client.get(req.originalUrl, (err, data) => {
            if(err || !data) next();
            else {
                res.json(JSON.parse(data));
            }
        })
    },
    setCache: function(requestUrl, ttl, data){
        client.set(requestUrl, data, 'EX', ttl);
    }
}