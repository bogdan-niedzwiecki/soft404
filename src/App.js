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
    // this.getUserData = this.getUserData.bind(this);
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
          render={() => {
            if (sessionStorage.getItem("azure_access_token")) {
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
            return <LoginForm onSuccessLogin={()=>this.getUserData} />;
          }}
        />
        <Route
          exact
          path="/logout"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            if (sessionStorage.getItem("azure_access_token")) {
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
            if (sessionStorage.getItem("azure_access_token")) {
              return <NewPost authToken={this.state.userData.token} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/profile"
          render={() => {
            if (sessionStorage.getItem("azure_access_token")) {
              return <Profile />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/"
          render={() => {
            if (sessionStorage.getItem("azure_access_token")) {
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
