//main server file

//imports
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
require('dotenv/config');

//get login page
require('./passport-setup.js');
require('./localpassport-config.js');

//converts post to json readable
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))


app.set('view engine', 'ejs');
//send cookies
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys : [process.env.COOKIE_KEY]
}));

app.use(flash());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
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
const friendsRoute = require('./routes/friends');
const authRoute = require('./routes/auth'); 
const postRoute = require('./routes/posts');
app.use('/add', postsRoutes);
app.use('/get', getRoute);
app.use('/delete',  deleteRoute);
app.use('/auth',  authenticationRoute);
app.use('/profile',  profileRoute);
app.use('/likes', likesRoute);
app.use('/friends', friendsRoute);
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);



app.listen(5000);
    
