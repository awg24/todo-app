var React = require("react");
var Link = require("react-router").Link;

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<nav className="top-nav">
					<ul className="title">
						<li><Link to="/">My Todo</Link></li>
					</ul>
					<ul className="menu">
						<li><Link to="/todo">Login</Link></li>
					</ul>
				</nav>
				<div className="view">
			 		{this.props.children}
			 	</div>
			</div>
		);
	}
});
