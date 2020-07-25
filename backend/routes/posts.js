const router = require('express').Router();
const User = require('../models/User');
const { route } = require('./auth');
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
    res.render('profile' , {user : req.user});
});







module.exports = router; 