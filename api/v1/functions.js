function datetimevalidation(datedata,timedata){
	return new Promise((resolve,reject)=>{
		if(datedata || timedata){
			var date = new Date();
			if(datedata){
				date = new Date(datedata);
				console.log("first-----------------",date);
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
					// console.log("time is set on ",date);
				}
				Date.prototype.isValid = function(){//check for a valit time input
					return this.getTime()===this.getTime();
				}

				if(date.isValid()){
					let x = new Date();
					// console.log("new -----------------",x);
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
	});//promise ends
}

function id_validation(scheduled_work_list,del_job_id){
	return new Promise((resolve,reject)=>{
		// console.log("id_validation",scheduled_work_list,del_job_id);
		if(del_job_id){
			if(scheduled_work_list.hasOwnProperty(del_job_id)){
				resolve(true);
			}else{
				reject("there is no such id found,it is an invalid id");
			}
		}else{
			reject("enter an id first");
		}
	});
}

module.exports = {
	datetimevalidation,
	id_validation,
}
