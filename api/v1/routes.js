var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');
var bodyparser = require('body-parser');
var validation = require('./functions');
var scheduler = require('node-schedule');

router.use(bodyparser.json());
var scheduled_work_list = 0;

// schedule a work
router.post('/schedulework',(req, res)=> {
	var datedata = req.query.datedata;
	var timedata = req.query.timedata;
	// console.log(datedata,timedata);
	var root = validation.datetimevalidation(datedata,timedata);
	root.then((date)=>{
		// console.log(time);
		var job = scheduler.scheduleJob(date,()=>console.log("i am doing your work at time",date));
		scheduled_work_list = scheduler.scheduledJobs;
		res.send("your work is scheduled at "+date+Object.keys(scheduled_work_list));
	})
	.catch((message)=>{
		// console.log(message);
		res.send(message);
	});
});

// delete a scheduled work
router.delete('/delete_scheduledwork',(req, res)=> {
  // console.log(scheduled_work_list);
	// console.log(Object.keys(scheduled_work_list));
	var del_job_id = req.query.del_job_id;
	var root = validation.id_validation(scheduled_work_list,del_job_id);
	root.then((bool)=>{
		if(bool){
			scheduled_work_list[del_job_id].cancel();
		}
		res.send(del_job_id+" is been deleted \n remaining tasks "+scheduled_work_list);
	}).catch((message)=>{
		res.send(message);
	})
});

router.patch('/update_scheduledwork',(req,res)=>{
	var datedata = req.query.datedata;
	var timedata = req.query.timedata;
	var del_job_id = req.query.del_job_id;
	var root = validation.id_validation(scheduled_work_list,del_job_id);
	var root1 = validation.datetimevalidation(datedata,timedata);
	Promise.all([root,root1]).then((date)=>{
		console.log(Object.keys(date));
		scheduled_work_list[del_job_id].reschedule(date[1]);
		res.send("your schedule having id=>"+del_job_id+"is updated");
	}).catch((message)=>{
		res.send(message);
	});
});


router.patch('/edit_schedule')
module.exports = router;
