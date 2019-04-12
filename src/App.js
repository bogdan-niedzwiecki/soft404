import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "./Components/Header/index";
import PostsList from "./Components/PostsList/index";
import Footer from "./Components/Footer/index";
import NewPost from "./Components/NewPost/NewPost";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import LoginForm from "./Components/Login/LoginForm";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        name: null,
        surname: null,
        userpic: null
      }
    };
    this.getUserData = this.getUserData.bind(this);
  }
  getUserData(userDetails) {
    this.setState({
      userData: {
        name: userDetails.name,
        surname: userDetails.surname,
        userpic: userDetails.userpic
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={() => {
            return <Header />;
          }}
        />
        <Route
          exact
          path="/login"
          render={() => {
            return <LoginForm onSuccessLogin={this.getUserData} />;
          }}
        />
        <Route
          exact
          path="/logout"
          render={() => {
            sessionStorage.removeItem('access_token');
            return <Redirect to="/login" />;
          }}
        />

        <Route exact path="/" component={PostsList} />
        <Route exact path="/addPost" component={NewPost} />
        <Route exact path="/profile" component={Profile} />
        <Route
          path="/"
          render={() => {
            return <Footer />;
          }}
        />
      </BrowserRouter>
    );
  }
}

export default App;
