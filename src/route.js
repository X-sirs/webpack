import React, { Component} from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Home from './home/containers/index';
export default class AppRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/home" render={(props) => {return <Home/>}}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
