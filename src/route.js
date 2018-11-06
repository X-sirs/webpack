import React, { Component} from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
// const Home = (nextState, cb) => {
//   require.ensure([], (require) => { cb(null, require("./home/containers/index.js").default);console.log("import homepage") }, 'home')
// };
import Home from './home/containers/index';
export default class AppRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/home"  render={()=><Home/>} />
        </Switch>
      </BrowserRouter>
    )
  }
}
