var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');
var bodyparser = require('body-parser');
var validation = require('./functions');
var scheduler = require('node-schedule');

router.use(bodyparser.json());

// date and time setter
router.post('/', function (req, res) {
	var datedata = req.query.datedata;
	var timedata = req.query.timedata;
	// console.log(datedata,timedata);
	var dtv = validation.datetimevalidation(datedata,timedata);
	dtv.then((time)=>{
		console.log(time);
		var job = scheduler.scheduleJob(time,()=>console.log("i am doing your work at time",time));
		res.send("your work is scheduled at "+time);
	})
	.catch((message)=>{
		console.log(message);
		res.send(message);
	});
});

// About page route.
router.get('/about', function (req, res) {
  res.send('About page');
});

module.exports = router;
