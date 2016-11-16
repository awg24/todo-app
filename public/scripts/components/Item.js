var React = require("react");
var axios = require("axios");
var Item = require("./Item");
var style = {};
module.exports = React.createClass({
	getInitialState: function() {
		var setStyles = this.props.task.completed ? {textDecoration: "line-through"} : {};
		return {
			editMode: false,
			item: this.props.task.item,
			completed: this.props.task.completed,
			styles: setStyles

		}
	},
	renderField: function(){
		return this.state.editMode ?
			(
				<form onSubmit={(e)=>{this.props.updateItem(e, this.props.task._id, this.props.index, this.state.item, this.state.completed); this.toggleEdit();}}>
					<input id="item" onChange={this.updateField} value={this.state.item} />
				</form>
			) : this.state.item;
	},
	toggleEdit: function(){
		this.setState({editMode: !this.state.editMode});
	},
	updateField: function(e){
		var update = {};
		update[e.target.id] = e.target.value;
		this.setState(update);
	},
	componentWillReceiveProps: function(nextProps) {
		var setStyles = nextProps.task.completed ? {textDecoration: "line-through"} : {};
		this.setState({item: nextProps.task.item, completed: nextProps.task.completed, styles: setStyles});
	},
	render: function(){
		return (
			<li style={this.state.styles}>
				{this.renderField()}
				<button onClick={this.toggleEdit}>Update</button>
				<button
					onClick={()=>{ if(this.state.editMode) this.toggleEdit(); this.props.removeItem(this.props.task._id, this.props.index)}}>
					Delete
				</button>
				<button onClick={(e)=>{this.props.updateItem(e, this.props.task._id, this.props.index, this.state.item, !this.state.completed)}}>Mark as completed</button>
			</li>
		);
	}
});
