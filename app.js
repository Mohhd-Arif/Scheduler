const express = require('express');
const app = express();
const routes = require('./api/v1/routes');


app.use('/api/v1',routes);
app.listen(8000,()=> console.log("listening on port 8000"));