var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');
var bodyparser = require('body-parser');
var validation = require('./functions');

router.use(bodyparser.json());
// router.

// Home page route.
router.post('/', function (req, res) {
	var datedata = req.query.datedata;
	var timedata = req.query.timedata;
	console.log(datedata,timedata);
	var dtv = validation.datetimevalidation(datedata,timedata);
	dtv.then((message)=>{
		console.log(message);
	})
	.catch((message)=>{
		console.log(message);
	});


	var date = new Date();
	console.log(date);

  res.send('home page');
});

// About page route.
router.get('/about', function (req, res) {
  res.send('About page');
});

module.exports = router;