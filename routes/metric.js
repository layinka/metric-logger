var express = require('express');
var router = express.Router();
var MetricLog = require( './../models/metric-log');

/* GET metric listing. */

router.get('/:key/sum', function(req, res, next) {
  
  let keyString = req.params.key;
  if(!metricLogs.has(keyString)){
    return res.status(404).send({ success: false, message: 'Key not found'});
  } 

  let arr = metricLogs.get(keyString);
  
  let hourAgo = new Date();
  hourAgo.setHours(hourAgo.getHours() - 1);

  //filter to only logs since hoursAgo. Old values are removed via cronjob
  let filtered = arr.filter(log => log.date >= hourAgo).map(f=>f.value);

  let sum = filtered.reduce((a,b) => a + b, 0);

  return res.status(200).send({ value: sum});

  // Add api rate limiter

  //Add cors
});


router.post('/:key', function(req, res, next) {
  let m= new MetricLog();

  let keyString = req.params.key;

  //check if body is valid
  const {value} = req.body;
  
  if(isNumeric(value)){
    const nValue = parseInt(value);
    // setting the values
    if(!metricLogs.has(keyString)){
      metricLogs.set(keyString, []);
    }

    let arr = metricLogs.get(keyString);
    arr.push(new MetricLog( new Date(), nValue) );
  }else{
    return res.status(400).send({ success: false, message: 'Invalid Input'});
  }

  return res.status(200).send({});
});



function isNumeric(num){
  num = "" + num; //coerce num to be a string
  return !isNaN(num) && !isNaN(parseFloat(num));
}

module.exports = router;
