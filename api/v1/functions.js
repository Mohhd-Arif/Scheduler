function datetimevalidation(datedata,timedata){
	return new Promise((resolve,reject)=>{
		if(datedata || timedata){
			var date = new Date();
			if(datedata){
				date = new Date(datedata);
				console.log(date);
			}
			if(timedata){
				timedata = timedata.split(':');
				timedata = timedata.map(x=>parseInt(x));
				console.log(timedata);
				if(!timedata[2]){
					timedata[2]=0;
				}
				if(timedata[0]<0||timedata[0]>24||timedata[1]<0||timedata[1]>60||timedata[2]<0||timedata[2]>60){
					reject("date format is not correct like -- 24hours 60 minute 60 second");
				}
				else{
					date.setHours(datedata[0],datedata[1],datedata[2]);
					console.log("time is set on ",date);
				}
			}
		}
		resolve(date);
	});
}

module.exports = {
	datetimevalidation,
}