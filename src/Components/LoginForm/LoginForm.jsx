import React, { Component } from "react";
import styles from "./styles";
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
  MDBInput,
} from "mdbreact";
import GoogleLogin from "react-google-login";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

class LoginForm extends Component {
  successResponse = (response) => {
    this.props.addUser(response);
  };

  componentDidUpdate() {
    this.props.history.push("/");
  }

  render() {
    const { classes } = this.props;
    return (
      <MDBContainer className={classes.root}>
        <Helmet>
          <title>Log in Form</title>
          <meta
            name="description"
            content="In this page we LogIn to our page by google"
          />
        </Helmet>
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
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Sign in"
                      onSuccess={this.successResponse}
                      onFailure={this.failureResponse}
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
