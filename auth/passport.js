var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("./../models/User");
var keys = require("./../config/keys");

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
		console.log("raaaaaun")
	    done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log("raaaaaun")
	    User.findById(id, function(err, user) {
	        done(err, user);
	    });
	});

	passport.use(new GoogleStrategy({
	    clientID: keys.google.clientId,
	    clientSecret: keys.google.clientSecret,
	    callbackURL: "http://localhost:3000/user/auth/google/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	console.log("raaaaaun blaaah")
	  	process.nextTick(function(){
			console.log("do I even get called?!");
			console.log(profile)
		    User.findOrCreate({ googleId: profile.id }, function (err, user) {
		       return done(err, user);
		    });
	  	});

	  }
	));
}



