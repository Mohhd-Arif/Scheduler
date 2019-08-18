const express = require('express');
const app = express();
const routes = require('./api/v1/routes');
const routerV2 = require('./api/v2/routes');


app.use('/api/v1',routes);
app.use('/api/v2',routerV2);
app.listen(8000,()=> console.log("listening on port 8000"));
