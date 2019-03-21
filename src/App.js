import React, { Component } from "react";
import style from "./App.css";
// import LogIn from "./LogIn/LogIn";
import SignIn from "./LogIn/LoginForm";
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
          <nav>
            <NavLink to="/pop"> Pop</NavLink>
            <NavLink to="/"> Home</NavLink>
          </nav>
          <Switch>
     
            {/* <Route path="/pop" component={LogIn} /> */}
           
            <Route path="/" component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
   
    );
  }
}

export default App;
