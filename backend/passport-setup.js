const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "90776022358-7pafpj29oirke9prk7aedcnil84j23if.apps.googleusercontent.com",
    clientSecret: "NcOkAuK4E69m9tMbsFtYpscr",
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));