var React = require("react");
var axios = require("axios");
var TodoList = require("./TodoList");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			task: ""
		}
	},
	updateItem: function(e){
		var task = {};
		task[e.target.id] = e.target.value;
		this.setState(task);
	},
	clearTask: function(){
		this.setState({task: ""});
	},
	render: function(){
		return (
			<form onSubmit={(e)=>{this.props.addItem(e, this.state.task); this.clearTask();}}>
				<input type="text" id="task" value={this.state.task} onChange={this.updateItem} placeholder="add item"/>
				<button type="submit">ADD</button>
			</form>
		);
	}
});
