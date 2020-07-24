const router = require('express').Router();
const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv/config'); 
const cors = require('cors')
router.use(cors());
const { registerValidation, loginValidation } = require('../validation');



const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    else{
        res.redirect('/api/user/loginPage')
    }
};

const checkNotAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        res.redirect('../posts/getProfile');
    }
    next();
};



router.post('/register', checkNotAuth, async (req,res) => {
   const {error} = registerValidation(req.body);
   if (error) {
       console.log('error');
       return res.status(400).send(error.details[0].message);
   }
   //check if dupilcate user
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists'); 
    console.log('crazy'); 
    //HASH passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //console.log(hashedPassword);
    //console.log(req.body.password);
    //console.log('hello');
    //create a new user
   const user = new User({
       userName: req.body.userName,
       email: req.body.email,
       password: hashedPassword  
   });
   console.log(user);
   try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.send({user: user._id});
   }catch(err){
       console.log(err);
       res.status(400).send(err); 
   } 
});

//Login
router.post('/login', checkNotAuth, passport.authenticate('local' , {
    successRedirect : '../posts/getProfile',
    failureRedirect : '/api/user/loginPage',
    failureFlash : true
}));

router.get('/loginPage', checkNotAuth, (req, res) => {
    res.render('login');
})

router.get('/logout', checkAuth, (req, res) => {
    req.logOut();
    res.redirect('/api/user/loginPage')
})








module.exports = router; 
