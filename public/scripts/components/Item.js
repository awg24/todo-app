var React = require("react");
var axios = require("axios");
var Item = require("./Item");

module.exports = React.createClass({
	render: function(){
		return (
			<li>
				{this.props.task.item}
				<button onClick={()=>{this.props.updateItem(this.props.task._id, this.props.index)}}>Update</button>
				<button onClick={()=>{this.props.removeItem(this.props.task._id, this.props.index)}}>Delete</button>
			</li>
		);
	}
});
