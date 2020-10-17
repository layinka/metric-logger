var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {

   var mp = new Map();

   mp.set('t', []);

   console.log('Mp is ', mp);

   mp.get('t').push({date:new Date()});

   mp.get('t').push({date:new Date()});
   console.log('Mp is now ', mp);
   mp.forEach((entry, key, map)=>{
      let hourAgo = new Date();
      hourAgo.setHours(hourAgo.getHours() - 1);

      let arr = entry;
      let filtered = arr.filter(log => 1==1);
      filtered.forEach(element => {
          var ix = arr.indexOf(element);            
          arr.splice(ix, 1); 
      });
  }) 
  console.log('Mp is filtered: ', mp);

  console.log('Mp is filtered Now: ', mp.has('t'));


   res.render('index', { title: 'Welcome to Metric Logger' });

});

module.exports = router;
