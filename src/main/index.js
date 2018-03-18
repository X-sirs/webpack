require("babel-core/register");
require("babel-polyfill");
import React from "react";
import ReactDOM from "react-dom";
/* App is the entry point to the React code.*/
import MainContainer from "./containers/main";

/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter ,Route,} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route path="main" component={MainContainer}/>
  </BrowserRouter>,
  document.getElementById("root")
);
