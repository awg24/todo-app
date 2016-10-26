
var React = require("react");
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRedirect = require('react-router').IndexRedirect;
var browserHistory = require('react-router').browserHistory;
var Main = require("./scripts/components/Main");
var Todo = require("./scripts/components/Todo");
var Login = require("./scripts/components/Login");
var Settings = require("./scripts/components/Settings");
var NotFound = require("./scripts/components/NotFound");


var container = document.getElementById("app");

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/todo"/>
            <Route path="/todo" component={Todo} />
            <Route path="/settings" component={Settings} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>,
    container
);
