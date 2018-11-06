// require("babel-core/register");
// require("babel-polyfill");
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./route.js";
ReactDOM.render(
    <AppRouter/>,
    document.getElementById("root")
);
