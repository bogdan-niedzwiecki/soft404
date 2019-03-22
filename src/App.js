import React, { Component } from "react";
import "typeface-roboto";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch,
  NavLink
} from "react-router-dom";
import ResponsiveDrawer from "./Components/Layout/ResponsiveDrawer/component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { x: false };
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ResponsiveDrawer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
