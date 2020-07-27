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

router.get('/getProfile/:userID', async (req,res) => {
    const isFriends = false;
    //console.log(req.params.userID);
    const currentUser = await User.findById(req.params.userID);
    console.log(currentUser.friends);
    if(currentUser.friends.includes(req.user._id)){
        isFriends = true;
    }
    res.render('otherUserProfile', {user : currentUser});
})

module.exports = router;