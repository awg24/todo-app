var express = require('express');
var router = express.Router();
var User = require("./../models/User");

/* GET users listing. */
router.get('/login', function(req, res, next) {
	var newUser = req.body;

	var user = new User({
		firstName: newUser.firstName,
		lastName: newUser.lastName,
		email: newUser.email,
		username: newUser.username,
		password: newUser.password
	});

	user.save().then(function(user){
		res.json({user});
	}).catch(function(err){
		res.json(err);
	})
});

module.exports = router;
