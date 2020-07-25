//route with user information

const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/User');
router.use(cors());

//if not logged in 
const authCheck = (req, res, next) =>{
    if(!req.user){
        res.send('Not logged in');
    }else{
        next();
    }
};

router.get('/', authCheck, (req, res) =>{
    res.send(req.user);
});

router.get('/getProfile', authCheck, (req, res) => {
    res.render('profile' , {user : req.user});
});

router.get('/getProfile/:userID', (req,res) => {
    const currentUser = User.findById(req.params.userID);
    res.render('profile', {user : currentUser});
})

module.exports = router;