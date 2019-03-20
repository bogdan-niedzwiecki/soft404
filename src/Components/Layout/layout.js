import React, { Component } from "react";
import style from "./layout.css";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch,
  NavLink
} from "react-router-dom";

class Layout extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">Posts</NavLink>
          </nav>
        </div>
      </BrowserRouter>
    );
  }
}

export default Layout;