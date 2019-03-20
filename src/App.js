import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch,
  NavLink
} from "react-router-dom";
import Layout from "./Components/Layout/layout";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { x: false };
  }
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={Layout} />
            {/* <Route exact path="/posts" component={Posts} /> */}
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
