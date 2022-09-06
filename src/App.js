// import React, { Component, useState } from "react";
// import { Redirect } from "react-router";
// import { BrowserRouter, Route } from "react-router-dom";

// import Header from "./Components/Header/";
// import Footer from "./Components/Footer/";
// import LoginForm from "./Components/LoginForm/";
// import PostsList from "./Components/PostsList/";
// import NewPost from "./Components/NewPost/";
// import Profile from "./Components/Profile";
// import EditProfile from "./Components/Profile/EditProfile";

// class App extends Component {

//   render() {
//     return (
//       <BrowserRouter>
//         <Route path="/" render={() => sessionStorage.getItem("token_id") ? (<Header />) : (<React.Fragment />)} />
//         <Route exact path="/login" render={() => <LoginForm onSuccessLogin={this.getToken} />} />
//         <Route exact path="/logout" render={() => <Redirect to="/login" />} />
//         <Route exact path="/" render={() => sessionStorage.getItem("token_id") ? (<PostsList />) : (<Redirect to="/login" />)} />
//         <Route exact path="/create_post" render={() => sessionStorage.getItem("token_id") ? (<NewPost />) : (<Redirect to="/login" />)} />
//         <Route exact path="/profile" render={() => sessionStorage.getItem("token_id") ? (<Profile />) : (<Redirect to="/login" />)} />
//         <Route exact path="/edit_profile" render={() => sessionStorage.getItem("token_id") ? (<EditProfile />) : (<Redirect to="/login" />)} />
//         <Route path="/" render={() => sessionStorage.getItem("token_id") ? (<Footer />) : (<React.Fragment />)} />
//       </BrowserRouter>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
import { Redirect } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import LoginForm from "./Components/LoginForm/";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("token_id") ? (
              <Redirect to="/feed" />
            ) : (
              <LoginForm />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() =>
            localStorage.getItem("token_id") ? (
              <Redirect to="/feed" />
            ) : (
              <LoginForm />
            )
          }
        />
        <Route
          exact
          path="/logout"
          render={() => {
            localStorage.removeItem("token_id");
            <Redirect to="/login" />;
          }}
        />
        <Route
          path="/"
          render={() =>
            localStorage.getItem("token_id") ? (
              <Layout />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </BrowserRouter>
    );
  }
}

export default App;
