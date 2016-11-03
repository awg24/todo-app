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
				<form onSubmit={(e)=>{this.props.updateItem(e, this.props.task._id, this.props.index, this.state.item); this.toggleEdit();}}>
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
		this.setState({item: nextProps.task.item});
	},
	render: function(){
		return (
			<li>
				{this.renderField()}
				<button onClick={this.toggleEdit}>Update</button>
				<button onClick={()=>{
					if(this.state.editMode){
						this.toggleEdit();
					}
					this.props.removeItem(this.props.task._id, this.props.index)}
				}>Delete</button>
			</li>
		);
	}
});
