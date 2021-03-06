var router = require("express").Router();
var Todo = require("./../models/Todo");
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/add", function(req, res){
	var task = req.body;
	var todo = new Todo({
		item: task.item,
		completed: task.completed,
		userId: task.userId
	});

	todo.save().then(function(doc){
		res.send(doc);
	}).catch(function(err){
		res.status(500).send(err);
	});
});

router.get("/get/:id", function(req, res){
	var params = req.params;
	var query = { userId: new ObjectId(params.id) };

	Todo.find(query).then(function(docs){
		res.send({tasks: docs});
	}).catch(function(err){
		res.status(500).send(err);
	});
});

router.patch("/update/:id", function(req, res){
	var params = req.params;
	var body = req.body;

	Todo.findOneAndUpdate(
		{ _id: params.id },
		{ $set: { completed: body.completed, item: body.item }},
		{new: true}
	).then(function(doc){
		res.send(doc);
	}).catch(function(err){
		res.status(500).send(err);
	});
});

router.delete("/delete/:id", function(req, res){
	var params = req.params;

	Todo.findByIdAndRemove(
		{ _id: params.id }
	).then(function(doc){
		res.send({done: true});
	}).catch(function(err){
		res.status(500).send(err);
	});
});


module.exports = router;
