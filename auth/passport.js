var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("./../models/User");
var keys = require("./../config/keys");

passport.use(new GoogleStrategy({
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:3000/todo"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("do I even get called?!");
  	console.log(profile)
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;
