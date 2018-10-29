import React from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
const MainPage = (nextState, cb) => {
  require.ensure([], (require) => { cb(null, require("./main/containers/main").default); }, 'MainPage')
};
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/main" getComponent={MainPage} />
    </Switch>
  </BrowserRouter>
);
export default App;
