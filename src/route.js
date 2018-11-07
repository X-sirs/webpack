import React, { Component,lazy,Suspense} from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
const Home = lazy(()=>import('./home/containers/index'));
const MyComponent = ()=>(
  <div>
      <Suspense fallback={<div style={{textAlign:"center"}}>...loading</div>}>
        <Home/>
      </Suspense>
  </div>
)
export default class AppRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/home" render={(props) => <MyComponent {...props}/>} />
        </Switch>
      </BrowserRouter>
    )
  }
}
