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
import Header from "./Components/Header/index";
import PostsList from "./Components/PostsList/index";
import React, { Component } from 'react';
import './App.css';
import OutlinedTextFields from "./Components/Posts/Post";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div >
        <OutlinedTextFields />

        
      </div>
      <BrowserRouter>
        <Header/>
        <Route exact path="/posts" component={PostsList} />
      </BrowserRouter>
    );
  }
}

export default App;
