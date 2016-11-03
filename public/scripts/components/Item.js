var React = require("react");
var axios = require("axios");
var Item = require("./Item");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			editMode: false,
			item: this.props.task.item,
			completed: false

		}
	},
	renderField: function(){
		return this.state.editMode ?
			(
				<form onSubmit={(e)=>{this.props.updateItem(e, this.props.task._id, this.props.index, this.state.item); this.triggerEdit();}}>
					<input id="item" onChange={this.updateField} value={this.state.item} />
				</form>
			) : this.props.task.item;
	},
	triggerEdit: function(){
		this.setState({editMode: !this.state.editMode});
	},
	updateField: function(e){
		var update = {};
		update[e.target.id] = e.target.value;
		this.setState(update);
	},
	render: function(){
		return (
			<li>
				{this.renderField()}
				<button onClick={this.triggerEdit}>Update</button>
				<button onClick={()=>{this.props.removeItem(this.props.task._id, this.props.index)}}>Delete</button>
			</li>
		);
	}
});