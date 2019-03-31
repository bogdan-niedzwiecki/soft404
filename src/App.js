import React, { Component } from "react";
import "typeface-roboto";
import Header from "./Components/Header/index";
import PostsList from "./Components/PostsList/index";
import Footer from "./Components/Footer/index";
import NewPost from "./Components/NewPost/NewPost";
import LogIn from "./Components/LogIn/LoginForm";
import {
  BrowserRouter,
  Route,
} from "react-router-dom";
class App extends Component {

  render() {
    return (
        
      <BrowserRouter>
        <Header/>
        <Route exact path="/" component={PostsList} />
        <Route exact path="/LogIn" component={LogIn} />
        <Route exact path="/create" component={NewPost} />
        <Footer />
      </BrowserRouter>
    ); 
  }
}

export default App;
