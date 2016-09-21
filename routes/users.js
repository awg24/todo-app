var User = require("./../models/User");

module.exports = function(app, passport){
	app.post('/login-notyet', function(req, res) {
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

	app.get("/authorize", function(req, res){
		res.header('Access-Control-Allow-Credentials', true);
		if (req.isAuthenticated()){
			return res.json({isAuthorized: true});
		}
		return res.json({isAuthorized: false});
	});

	app.get('/user/auth/google',
	  	passport.authenticate('google', { scope: ['profile', 'email']})
	);

	app.get('/user/auth/google/callback', passport.authenticate('google',
		{ failureRedirect : '/failed' }),
		function(req, res){
			res.redirect("/todo");
	});
}
