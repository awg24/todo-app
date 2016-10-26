var React = require("react");
var Link = require("react-router").Link;
var browserHistory = require("react-router").browserHistory;
var axios = require("axios");


module.exports = React.createClass({
	getInitialState: function(){
		return {
			loggedIn: false,
			user: null
		};
	},
	componentDidMount: function(){
		axios.get(window.location.origin + "/authorize", {withCredentials: true}).then(response => {
			if(!response.data.isAuthorized){
				return browserHistory.push("/login");
			}
			this.setState({
				loggedIn: response.data.isAuthorized,
				user: response.data.user
			});
		});
	},
	handleLogout: function(){
		var that = this;
		axios.get(window.location.origin + "/logout").then(response => {
			this.setState({
				loggedIn: response.data.isAuthorized,
				user: null
			});
			browserHistory.push("/login");
		});
	},
	render: function(){
		return (
			<div>
				<nav className="top-nav">
					<ul className="title">
						<li><Link to={this.state.loggedIn ? "/todo" : "/login"}>My Todo</Link></li>
					</ul>
					<ul className="menu">
						<li>
							{
								this.state.loggedIn ?
								([
									<Link key={2} to="/settings">Settings</Link>,
									<a key={1} className="clickable" onClick={this.handleLogout}>Logout</a>
								])
								:
								(<Link to="/login">Login</Link>)
							}
						</li>
					</ul>
				</nav>
				<div className="view">
			 		{React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn})}
			 	</div>
			</div>
		);
	}
});
