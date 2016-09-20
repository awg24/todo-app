var express = require('express');
var router = express.Router();
var User = require("./../models/User");
var passport = require("./../auth/passport");

router.post('/login', function(req, res, next) {
	var newUser = req.body;

	var user = new User({
		firstName: newUser.firstName,
		lastName: newUser.lastName,
		email: newUser.email,
		username: newUser.username,
		password: newUser.password
	});

	user.save().then(function(user){
		res.json(user);
	}).catch(function(err){
		if(err.code === 11000){
			var dupe = err.errmsg.split("\"")[1];
			return res.json({error: dupe + " already exists."});
		}
		var prop = Object.keys(err.errors)[0];
		return res.json({message: err.errors[prop].message});

	});
});

router.get('/auth/google',
  	passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' })
);

router.get('/',
  	passport.authenticate('google', {
  		failureRedirect: '/'
  	}),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
