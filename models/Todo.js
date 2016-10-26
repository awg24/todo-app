var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	item:  {
		type: String,
		required: [true, "Fill in a thing to do!"]
	},
	completed: {
		type: Boolean,
		default: false,
	},
	userId: {
		type: Schema.Types.ObjectId,
		require: true
	}
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
