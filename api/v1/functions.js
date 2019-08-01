function datetimevalidation(datedata,timedata){
	return new Promise((resolve,reject)=>{
		resolve("time and date is valid");
	});
}

module.exports = {
	datetimevalidation,
}