var React = require("react");
var axios = require("axios");
var Item = require("./Item");

module.exports = React.createClass({
	render: function(){
		return (
			<li>
				{this.props.task.item}
			</li>
		);
	}
});
