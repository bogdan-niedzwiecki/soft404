import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "./Components/Header/";
import PostsList from "./Components/PostsList/";
import Footer from "./Components/Footer/";
import NewPost from "./Components/NewPost/";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import LoginForm from "./Components/Login/LoginForm";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        azure_token: false
      }
    };
  }

  getUserData(userDetails) {
    this.setState({
      userData: {
        azure_token: userDetails.azure_token
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={() =>
            sessionStorage.getItem("azure_access_token") ? (
              <Header />
            ) : (
              <React.Fragment />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() => <LoginForm onSuccessLogin={() => this.getUserData} />}
        />
        <Route exact path="/logout" render={() => <Redirect to="/login" />} />
        <Route
          exact
          path="/"
          render={() =>
            sessionStorage.getItem("azure_access_token") ? (
              <PostsList />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/create_post"
          render={() =>
            sessionStorage.getItem("azure_access_token") ? (
              <NewPost authToken={this.state.userData.token} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/profile"
          render={() =>
            sessionStorage.getItem("azure_access_token") ? (
              <Profile />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/"
          render={() =>
            sessionStorage.getItem("azure_access_token") ? (
              <Footer />
            ) : (
              <React.Fragment />
            )
          }
        />
      </BrowserRouter>
    );
  }
}

export default App;
