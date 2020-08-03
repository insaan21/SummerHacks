//route with user information

const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/User');
const Comments = require('../models/Comments');
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

router.get('/getProfile', authCheck, async (req, res) => {
    const comments = await Comments.find({userID : req.user._id});
    comments.sort(function(a, b){
        return b.likes.length - a.likes.length;
    });
    res.render('profile' , {user : req.user, comments : comments});
});

router.get('/getProfile/:userID', authCheck, async (req,res) => {
    try {
        var isFriends = false;
        const currentUser = await User.findOne({_id : req.params.userID});
        if(currentUser.friends.includes(req.user._id)){
            isFriends = true;
        }
        const comments = await Comments.find({userID : req.params.userID});
        comments.sort(function(a, b){
            return b.likes.length - a.likes.length;
        });
        res.render('otherUserProfile', {user : currentUser, friends : isFriends, comments : comments});
    } catch (error) {
        console.log(error);
    }
});

  

module.exports = router;