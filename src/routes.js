import React, { Component } from "react";
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Main from "./main/containers/main.js";
const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" exact component={HomePage} />
      <Route path="/user" component={UsersPage} />
      <Route path="/main" component={Main} />
    </Switch>
  </BrowserRouter>
);
export default App;
