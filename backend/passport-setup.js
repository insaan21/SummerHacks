const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User')
require('dotenv/config');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
    });
});
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
},
  (accessToken, refreshToken, profile, done) => {
    //check if user exists
    //console.log(profile);
    User.findOne({ googleID: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already ave the user
        //console.log(currentUser);
        done(null, currentUser);
      }
      else {
        new User({
          userName: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value
        }).save().then((newUser) => {
          //console.log(newUser);
          done(null, newUser);
        });
      }
    })
  }
));