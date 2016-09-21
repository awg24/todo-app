var React = require("react");
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Main = require("./components/Main");
var Todo = require("./components/Todo");

var container = document.getElementById("app");

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Main} >
			<Route path="todo" component={Todo} >
			</Route>
		</Route>
  	</Router>,
  	container
);
