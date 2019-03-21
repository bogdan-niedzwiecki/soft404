import React, { Component } from "react";
import style from "./App.css";
import SignIn from "./Components/LogIn/LoginForm";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch,
  NavLink
} from "react-router-dom";
// import LoginButton from "./Components/LogIn/LogIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { x: false };
  }
  render() {
    return (
      <BrowserRouter>
        <div className={style.app}>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
