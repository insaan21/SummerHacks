//google authentication setup using passport

//imports
const passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User')
require('dotenv/config');

//sends id to cookie 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//receives cookie and sends profile information
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
    });
});

//creating new User or determining existing User using google login
passport.use(new localStrategy({usernameField : 'email'},
  async (email, password, done) => {
    //check if user exists
    User.findOne({ email: email }).then((currentUser) => {
      if (currentUser == null) {
        // already have the user
        return done(null, false, { message : "No user with that email."});
      }
      try {
        if(bcrypt.compareSync(password, currentUser.password)){
          return done(null, currentUser);
        }
        else{
          return done(null, false, {message : "Inccorect Password"})
        }
      } catch (error) {
        return done(error);
      }
    });
  }));