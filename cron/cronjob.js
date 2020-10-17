var CronJob = require('cron').CronJob;
var job = new CronJob('59 */1 * * * *', function() {
  
    metricLogs.forEach((entry, key, map)=>{
        let hourAgo = new Date();
        hourAgo.setHours(hourAgo.getHours() - 1);

        let arr = entry;
        let filtered = arr.filter(log => log.date < hourAgo);
        filtered.forEach(element => {
            var ix = arr.indexOf(element);            
            arr.splice(ix, 1); 
        });
    }) 

}, null, true);

module.exports = job;
