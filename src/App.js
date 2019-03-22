import React, { Component } from "react";
import style from "./App.css";
import LoginButton from "./Components/LogIn/LoginForm";
// import LoginButton from "./Components/test";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch,
  NavLink
} from "react-router-dom";

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
            <Route path="/" component={LoginButton} />
          </Switch>
        </div>
      </BrowserRouter>
   
    );
  }
}

export default App;
