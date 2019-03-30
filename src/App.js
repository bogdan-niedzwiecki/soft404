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
import Footer from "./Components/Footer/index";
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Header/>
        <Route exact path="/" component={PostsList} />
        <Footer />
      </BrowserRouter>
    ); 
  }
}

export default App;
