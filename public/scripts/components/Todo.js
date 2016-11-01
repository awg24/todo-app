var React = require("react");
var axios = require("axios");
var TodoList = require("./TodoList");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			task: "",
			error: "",
			newTask: ""
		}
	},
	addItem: function(e){
		e.preventDefault();
		var that = this;
		if(this.state.task){
			axios.post(
				window.location.origin + "/todos/add",
				{
					item: this.state.task,
					userId: this.props.user._id,
				}
			).then(function(response){
				that.setState({newTask: response.data.item, task: ""});
			});
		} else {
			this.setState({error: "Field needs to be filled!"});
		}
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({user: nextProps.user})
	},
	updateItem: function(e){
		var task = {};
		task[e.target.id] = e.target.value;
		this.setState(task);
	},
	render: function(){
		return (
			<div>
				{this.state.error}
				<form onSubmit={this.addItem}>
					<input type="text" id="task" value={this.state.task} onChange={this.updateItem} placeholder="add item"/>
					<button type="submit">ADD</button>
				</form>
				<TodoList user={this.props.user} newItem={this.state.newTask}/>
			</div>
		);
	}
});
