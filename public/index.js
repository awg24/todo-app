require("./styles/style.scss");

var React = require("react");
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Main = require("./scripts/components/Main");
var Todo = require("./scripts/components/Todo");
var Login = require("./scripts/components/Login");
var axios = require("axios");

var container = document.getElementById("app");

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<Route path="/todo" component={Todo} onEnter={authorize} />
			<Route path="/login" component={Login} />
		</Route>
  	</Router>,
  	container
);

function authorize(nextState, replace, next){
	axios.get("http://localhost:3000/authorize", {withCredentials: true}).then(function(response){
		if(!response.data.isAuthorized){
			replace({
				pathname: "/login",
			});
			return next();
		}
		return next();
	});
}
