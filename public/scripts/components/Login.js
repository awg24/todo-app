var React = require("react");
var Link = require("react-router").Link;

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<input type="text"/>
				<input type="password"/>
				or
				<a href="http://localhost:3000/user/auth/google">Sign in with Google</a>
			</div>
		);
	}
});
