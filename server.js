var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require("passport");
mongoose.Promise = Promise;
var PORT = process.env.PORT || 3000;

var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session({ secret: "skdhoiD@DS2442e"+ new Date() }));
require("./auth/passport")(passport)
require("./routes/users")(app, passport)

app.get("*",function(req, res){
	res.sendFile(path.join(__dirname, "./index.html"));
});

mongoose.connect('mongodb://localhost/todo');
mongoose.connection.on('connected', function () {
  console.log("Mongoose connected to MongoDB");
});
mongoose.connection.on('error', function (err) {
  console.log("Mongoose error: " + err);
});

app.listen(PORT, function(req, res){
	console.log("Listening on port: " + PORT);
});
