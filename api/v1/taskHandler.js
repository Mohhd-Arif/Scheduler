const scheduler = require('node-schedule');
var scheduled_work_list = 0;

function scheduleWork(req){
  return new Promise((resolve,reject)=>{
    var datedata = req.query.datedata;
    var timedata = req.query.timedata;
    var root = timedateValidation(datedata,timedata);
    root.then((date)=>{
      var job = scheduler.scheduleJob(date,()=>console.log("i am doing your work"));
      scheduled_work_list = scheduler.scheduledJobs;
      console.log(job.name);
      resolve("your task is been scheduled at "+date);
  }).catch(message=>{
    reject(message);
  });

});
}
function deleteScheduledwork(req){
  return new Promise((resolve,reject)=>{
    let del_job_id = req.query.del_job_id;
    let root = id_validation(del_job_id);
    root.then(message=>{
        scheduler.scheduledJobs[del_job_id].cancel();
        console.log(scheduled_work_list);
        resolve(del_job_id+"is deleted");
    }).catch(message=>reject(message));
  })
}

function updateScheduledWork(req){
  return new Promise((resolve,reject)=>{
    let update_job_id = req.query.update_job_id;
    let datedata = req.query.datedata;
    let timedata = req.query.timedata;
    let root = id_validation(update_job_id);
    let root1 = timedateValidation(datedata,timedata);
    Promise.all([root,root1]).then((data)=>{
  		scheduled_work_list[update_job_id].reschedule(data[1]);
      resolve("your schedule having id=>"+update_job_id+"is updated")
  		// res.send("your schedule having id=>"+update_job_id+"is updated");
  	}).catch((message)=>{
      reject(message);
  		// res.send(message);
  	});
  })
}


function timedateValidation(datedata,timedata){
  return new Promise((resolve,reject)=>{
    if(datedata || timedata){
      var date = new Date();
      if(datedata){
        date = new Date(datedata);
      }
      if(timedata){
        timedata = timedata.split(':');
        timedata = timedata.map(x=>parseInt(x));

        if(!timedata[2]){
          timedata[2]=0;
        };
        if(timedata[0]<0||timedata[0]>24||timedata[1]<0||timedata[1]>60||timedata[2]<0||timedata[2]>60){
          reject("date format is not correct like -- 24hours 60 minute 60 second");
        }
        else{
          date.setHours(timedata[0],timedata[1],timedata[2]);
          console.log("time is set on ",date);
        }
        Date.prototype.isValid = function(){//check for a valid time input
          return this.getTime()===this.getTime();
        }

        if(date.isValid()){
          let x = new Date();
            if(x>date){
              reject("the time is in past");
            }else{
                resolve(date);
            }
        }else{
          reject("please enter a valid date or time");
          }
      }
    }

  });
}



function id_validation(job_id){
  return new Promise((resolve,reject)=>{
    // console.log("id_validation",scheduled_work_list,del_job_id);
    if(job_id){
      if(scheduled_work_list.hasOwnProperty(job_id)){
        resolve(true);
      }else{
        reject("there is no such id found,it is an invalid id");
      }
    }else{
      reject("enter an id first");
    }
  });
}

module.exports = {scheduleWork,
                  deleteScheduledwork,
                  updateScheduledWork
}
