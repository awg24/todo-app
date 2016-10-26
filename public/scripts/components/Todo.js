var React = require("react");
var axios = require("axios");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			task: "",
			error: ""
		}
	},
	request: function(e){
		e.preventDefault();
		var that = this;
		if(this.state.task){
			axios.post(
				window.location.origin + "/todos/add",
				{item: this.state.task, userId: this.props.loggedIn.id}
			).then(function(response){
				console.log(response)
				that.setState({test: response.data.test});
			});
		} else {
			this.setState({error: "Field needs to be filled!"});
		}
	},
	updateItem: function(e){
		var task = {};
		task[e.target.id] = e.target.value;
		this.setState({task});
	},
	render: function(){
		return (
			<div>
				{this.state.error}
				<form onSubmit={this.request}>
					<input type="text" id="task" onChange={this.updateItem} placeholder="add item"/>
					<button type="submit">ADD</button>
				</form>
			</div>
		);
	}
});
