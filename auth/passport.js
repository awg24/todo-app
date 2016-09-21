var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("./../models/User");
var keys = require("./../config/keys");

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
	    done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
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
	  	process.nextTick(function(){
			var email = profile.emails[0].value;
			var username = profile.emails[0].value;
			var firstName = profile.name.givenName;
			var lastName = profile.name.familyName;

		    User.findOne({ email: email }, function (err, user) {
		    	if(!user){
		    		var user = new User({
		    			email: email,
		    			username: username,
		    			firstName: firstName,
		    			lastName: lastName,
		    			password: accessToken
		    		})
		    		user.save().then(function(user){
		    			return done(err, user);
		    		}).catch(function(err){
		    			console.log(err);
		    			return done(err, null);
		    		})
		    	} else {
		    		return done(err, user);
		    	}
		    });
	  	});

	  }
	));
}



