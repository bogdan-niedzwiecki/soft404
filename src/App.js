import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "./Components/Header/index";
import PostsList from "./Components/PostsList/index";
import Footer from "./Components/Footer/index";
import NewPost from "./Components/NewPost/NewPost";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import LoginForm from "./Components/Login/LoginForm";
import EditProfile from "./Components/Profile/EditProfile/EditProfie";
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
    this.removeUserStorage = this.removeUserStorage.bind(this);
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

  removeUserStorage() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("surname");
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("email");
  }
  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={() => {
            if (sessionStorage.getItem("access_token")) {
              return <Header />;
            } else {
              return;
            }
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
            this.removeUserStorage();
            return <Redirect to="/login" />;
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            if (sessionStorage.getItem("access_token")) {
              return <PostsList />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/create_post"
          render={() => {
            if (sessionStorage.getItem("access_token")) {
              return <NewPost />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/edit_post"
          render={() => {
            if (sessionStorage.getItem("access_token")) {
              return <NewPost />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/profile"
          render={() => {
            if (sessionStorage.getItem("access_token")) {
              return <Profile />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/edit_Profile"
          render={() => {
            if (sessionStorage.getItem("access_token")) {
              return <EditProfile />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/"
          render={() => {
            if (sessionStorage.getItem("access_token")) {
              return <Footer />;
            } else {
              return;
            }
          }}
        />
      </BrowserRouter>
    );
  }
}

export default App;
