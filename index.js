require ('dotenv').config();
const express = require ('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const helmet = require ('helmet');
const cors = require ('cors');
const Router = require('./src/Routes/index')

const configurationOptions = {
    methods : ['GET', 'PUT', 'POST', 'DELETE'],
    origin : '*'
}

app.use(cors (configurationOptions));
app.use (helmet.xssFilter ());
app.use (logger ('dev'));


// app.use('/api', router)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/', Router)


//Server listening
app.listen(8000, () => {
  console.log('Server started on port 8000...');
}); 



module.exports = app;