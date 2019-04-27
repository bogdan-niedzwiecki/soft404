import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "./Components/Header/";
import PostsList from "./Components/PostsList/";
import Footer from "./Components/Footer/";
import NewPost from "./Components/NewPost/";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import LoginForm from "./Components/Login/LoginForm";
import EditPost from "./Components/PostsList/EditPost/index";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        token: false,
        name: "",
        givenName: "",
        id: "",
        photo: null
      }
    };
  }

  getToken = azure_token => {
    fetch("https://delfinkitrainingapi.azurewebsites.net/api/user", {
      method: "GET",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    })
      .then(response => response.json())
      .then(resp => {
        this.setState(
          {
            userData: {
              token: azure_token,
              name: resp.Name,
              givenName: resp.GivenName,
              id: resp.Id,
              photo: resp.Photo
            }
          },
          () => console.log("state.userData IN APP.JS", this.state.userData)
        );
      });
  };

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
          render={() => <LoginForm onSuccessLogin={this.getToken} />}
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
          path="/edit_Post"
          render={() =>
            sessionStorage.getItem("azure_access_token") ? (
              <EditPost authToken={this.state.userData.token} />
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
          exact
          path="/edit_profile"
          render={() =>
            sessionStorage.getItem("azure_access_token") ? (
              <EditProfile />
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
