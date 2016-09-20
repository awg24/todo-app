var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var isEmail = require('validator').isEmail;

var UserSchema = new Schema({
  firstName:  {
  	type: String,
  	required: [true, "A first name must be provided."]
  },
  lastName: {
  	type: String,
  	required: [true, "A last name must be provided."]
  },
  email:   {
  	type: String,
  	required: [true, "An email must be provided."],
  	validate: [isEmail, "An email address is required"],
  	index: true,
  	unique: [true, ":email already exists."]
  },
  username: {
  	type: String,
  	required: [true, "A username must be provided."],
  	index: true,
  	unique: [true, ":username already exists."]
  },
  password: {
  	type: String,
  	required: [true, "A password must be provided."],
  	validate: [isLongEnough, "Password needs to be 8 or more characters."]
  },

});

function isLongEnough(pass){
	return pass.length >= 8;
}

var User = mongoose.model('User', UserSchema);

module.exports = User;
