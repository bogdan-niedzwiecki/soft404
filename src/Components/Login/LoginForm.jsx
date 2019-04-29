import React from "react";
import styles from "./LogInFormStyle";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput
} from "mdbreact";
import GoogleLogin from "react-google-login";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      azure_token: false
    };
  }

  responseGoogle = response => {
    fetch("https://delfinkitrainingapi.azurewebsites.net/.auth/login/google", {
      method: "POST",
      headers: { "content-type": "Application/JSON" },
      body: JSON.stringify({
        id_token: response.tokenId
      })
    })
      .then(response => response.json())
      .then(resp => {
        sessionStorage.setItem("azure_access_token", resp.authenticationToken);
      })
      .then(() => this.props.history.push("/"));

    sessionStorage.setItem("name", response.w3.ofa);
    sessionStorage.setItem("surname", response.w3.wea);
    sessionStorage.setItem("avatar", response.w3.Paa);
    sessionStorage.setItem("email", response.w3.U3);
  };

  noResponseGoogle = response => {
    alert("Login has been failed");
    console.log(response);
  };

  render() {
    const { classes } = this.props;

    return (
      <MDBContainer className={classes.root}>
        <MDBRow className={classes.content}>
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign in</strong>
                  </h3>
                </div>
                <form>
                  <MDBInput
                    label="Your email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    autoComplete="current-email"
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    validate
                    containerClass="mb-0"
                    autoComplete="current-password"
                  />
                  <p className="font-small blue-text d-flex justify-content-end pb-3">
                    Forgot
                    <a href="#!" className="blue-text ml-1">
                      Password?
                    </a>
                  </p>

                  <div className="text-center  mb-3">
                    <NavLink to="/">
                      <MDBBtn
                        type="button"
                        color="deep-orange"
                        active
                        outline
                        className="btn-block z-depth-1a"
                      >
                        Sign in
                      </MDBBtn>
                    </NavLink>
                  </div>
                  <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                    or Sign in with:
                  </p>
                  <div className="row my-3 d-flex justify-content-center">
                    <GoogleLogin
                      clientId="576077564511-fd1t0nbqe1av9rr70to25hnuce1j0mg7.apps.googleusercontent.com"
                      buttonText="Sign in"
                      onSuccess={this.responseGoogle}
                      onFailure={this.noResponseGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </form>
              </MDBCardBody>

              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Not a member?
                  <a href="#!" className="blue-text ml-1">
                    Sign Up
                  </a>
                </p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(LoginForm));
