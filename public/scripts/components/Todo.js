var React = require("react");
var axios = require("axios");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			test: ""
		}
	},
	request: function(){
		var that = this;
		console.log("ran")
		axios.get(window.location.origin + "/users").then(function(response){
			console.log(response)
			that.setState({test: response.data.test});
		});
	},
	render: function(){
		return (
			<div>
				<button onClick={this.request}>Make Request</button>
				{this.state.test}
			</div>
		);
	}
});
