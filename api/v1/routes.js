const express = require('express');
const routerV2 = express.Router();
const taskHandler = require('./taskHandler');
const bodyparser = require('body-parser');

routerV2.use(bodyparser.json());

routerV2.post('/schedulework',(req,res)=>{
  let root = taskHandler.scheduleWork(req);
  root.then(message=>res.send(message)).catch(message=>res.send(message));
});

routerV2.delete('/delete_scheduledwork',(req,res)=>{
  let root = taskHandler.deleteScheduledwork(req);
  root.then(message=>res.send(message)).catch(message=>res.send(message));
});

routerV2.patch('/update_scheduledwork',(req,res)=>{
  let root = taskHandler.updateScheduledWork(req);
  root.then(message=>res.send(message)).catch(message=>res.send(message));
});



module.exports = routerV2;
