const router = require('express').Router();
const User = require('../models/User');
const { route } = require('./auth');
const Comments = require('../models/Comments');
const path = require('path');

const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    }
    else{
        res.send('Not logged in');
    }
}


router.get('/', checkAuth, async (req, res) => {
    res.send(req.user);
    

});

router.get('/getProfile/', checkAuth,  async (req, res) => {
    const comments = await Comments.find({userID : req.user._id});
    comments.sort(function(a, b){
        return b.likes.length - a.likes.length;
    });
    res.render('profile' , {user : req.user, comments : comments});
});







module.exports = router; 