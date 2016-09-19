var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var isEmail = require('validator').isEmail;

var UserSchema = new Schema({
  firstName:  {
  	type: String,
  	required: true
  },
  lastName: {
  	type: String,
  	required: true
  }
  email:   {
  	type: String,
  	required: true,
  	validate: [isEmail, "An email address is required"]
  },
  username: {
  	type: String,
  	required: true
  },
  password: {
  	type: String,
  	required: true,
  	validate: [isLongEnough, "Password needs to be longer 8 or more characters."]
  },

});

function isLongEnough(pass){
	return pass.length >= 8;
}

var User = mongoose.model('User', UserSchema);

module.exports = User;
