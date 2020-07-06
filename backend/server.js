const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv/config');


//get login page
require('./passport-setup.js');

//converts post to json readable
app.use(bodyParser.json());


//send cookies
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys : [process.env.COOKIE_KEY]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to db;
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser : true, useUnifiedTopology : true}, connected());
function connected(){
    console.log('Connected to DB');
}

//Import routes
const postsRoutes = require('./routes/add');
const getRoute = require('./routes/getAll');
const deleteRoute = require('./routes/delete');
const authenticationRoute = require('./routes/authentication');
const profileRoute = require('./routes/profile');
const likesRoute = require('./routes/likes');
app.use('/add', postsRoutes);
app.use('/get', getRoute);
app.use('/delete',  deleteRoute);
app.use('/auth',  authenticationRoute);
app.use('/profile',  profileRoute);
app.use('/likes', likesRoute);

app.listen(5000);
    
