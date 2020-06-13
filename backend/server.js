const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv/config');

//converts post to json readable
app.use(bodyParser.json());

//connect to db;
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser : true, useUnifiedTopology : true}, connected());
function connected(){
    console.log('Connected to DB');
}

//Import routes
const postsRoutes = require('./routes/add');
const getRoute = require('./routes/getAll');
const deleteRoute = require('./routes/delete');
app.use('/add', postsRoutes);
app.use('/get', getRoute);
app.use('/delete',  deleteRoute);

app.listen(5000);
    
