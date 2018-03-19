require("babel-core/register");
require("babel-polyfill");
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter ,Route} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route path="main" 
          getComponent={(nextState, callback) => {
                        require.ensure([], require => {
                        callback(null, require("./main/containers/main").default);
                        }, 'main/main')
                }}
    />
  </BrowserRouter>,
  document.getElementById("root")
);
