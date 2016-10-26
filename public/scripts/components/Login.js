var React = require("react");
var Link = require("react-router").Link;

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<div className="form">
					<input placeholder="username" type="text"/>
					<br/>
					<input type="password" placeholder="password"/>
					<br/><br/>
					or
					<br/><br/>
				</div>
				<a href={window.location.origin + "/user/auth/google"} title="Sign In With Google"></a>
			</div>
		);
	}
});
