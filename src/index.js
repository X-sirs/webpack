require("babel-core/register");
require("babel-polyfill");
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import App from './routes.js';
//import routes from './routes';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory();

ReactDOM.render(
        <App/>,
        document.getElementById("root")
);
