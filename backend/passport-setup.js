//google authentication setup using passport

//imports
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
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
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
},
  (accessToken, refreshToken, profile, done) => {
    //check if user exists
    User.findOne({ googleID: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have the user
        done(null, currentUser);
      }
      else {
        new User({
          userName: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    })
  }
));