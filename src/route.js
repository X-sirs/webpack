import React, { Component,lazy,Suspense} from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
const Home = lazy(()=>import('./home/containers/index'));
const LoadPage = (MyComponent,props)=>(
  <div>
      <Suspense fallback={<div style={{textAlign:"center"}}>...loading</div>}>
        <MyComponent {...props}/>
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
          <Route path="/home" render={(props) => LoadPage(Home,props)} />
        </Switch>
      </BrowserRouter>
    )
  }
}
