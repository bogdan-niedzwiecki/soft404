import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect } from "react-router-dom";
// import { format } from "url";

// const responseGoogle

class LoginButton extends Component {
  render() {
    return (
      <BrowserRouter>
        <GoogleLogin
          clientId="576077564511-fd1t0nbqe1av9rr70to25hnuce1j0mg7.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={Okey}
          onFailure={NotOkey}
        />
        if (Okey) {<Redirect to="/home" />}
      </BrowserRouter>
    );
  }
}

export default LoginButton;
