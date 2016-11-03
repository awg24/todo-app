var React = require("react");
var axios = require("axios");
var TodoList = require("./TodoList");
var AddItemForm = require("./AddItemForm");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			error: "",
			newTask: ""
		}
	},
	addItem: function(e, task){
		e.preventDefault();
		var that = this;
		if(task){
			axios.post(
				window.location.origin + "/todos/add",
				{
					item: task,
					userId: this.props.user._id,
				}
			).then(function(response){
				that.setState({newTask: response.data.item, task: "", error: ""});
			});
		} else {
			this.setState({error: "Field needs to be filled!"});
		}
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({user: nextProps.user})
	},
	render: function(){
		return (
			<div>
				{this.state.error}
				<AddItemForm addItem={this.addItem} />
				<TodoList user={this.props.user} newItem={this.state.newTask}/>
			</div>
		);
	}
});
