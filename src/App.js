import React, { Component } from "react";
import "typeface-roboto";
import Header from "./Components/Header/index";
import PostsList from "./Components/PostsList/index";
import OutlinedTextFields from "./Components/Posts/Post";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch,
  NavLink
} from "react-router-dom";


class App extends Component {

  render() {
    return (

        
      <BrowserRouter>
        <Header/>
        <Route exact path="/posts" component={PostsList} />
        
        <Route exact path="/create" component={OutlinedTextFields } />
      </BrowserRouter>
    );
  }
}

export default App;
