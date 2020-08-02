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
       return res.status(400).send(error.details[0].message);
   }
   //check if dupilcate user
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists'); 
    //HASH passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
   const user = new User({
       userName: req.body.userName,
       email: req.body.email,
       password: hashedPassword,
       thumbnail : 'https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg'
   });
   try {
    const savedUser = await user.save();
    res.send({user: user._id});
   }catch(err){
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
