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
  MDBIcon,
  MDBBtn,
  MDBInput
} from "mdbreact";
import { Redirect } from 'react-router'
import GoogleLogin from "react-google-login";


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        name: null,
        surname: null,
        userpic: null
      }
    };
  }
  render() {
    const { classes } = this.props;

    const responseGoogle = response => {
      sessionStorage.setItem('access_token', response.Zi.access_token);
      sessionStorage.setItem('name', response.w3.ofa);
      sessionStorage.setItem('surname',response.w3.wea);
      sessionStorage.setItem('avatar',response.w3.Paa);
      sessionStorage.setItem('email',response.w3.U3);
      console.log("response app/: ", response);
      this.setState({
        userData: {
          name: response.w3.ofa,
          surname: response.w3.wea,
          userpic: response.w3.Paa
        }
      });
      this.props.onSuccessLogin(this.state.userData);
    };
    const notResponseGoogle = response => {
      console.log("Response is failed");
      console.log(response);
    };

    if (sessionStorage.getItem("access_token")) {
      return <Redirect to='/'/>;
    }
    
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
                <MDBInput
                  label="Your email"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Your password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                />
                <p className="font-small blue-text d-flex justify-content-end pb-3">
                  Forgot
                  <a href="#!" className="blue-text ml-1">
                    Password?
                  </a>
                </p>

                <div className="text-center  mb-3">
                  <NavLink component={NavLink} to="/">
                    <MDBBtn
                      type="button"
                      color="deep-orange"
                      active
                      outline="true"
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
                    onSuccess={responseGoogle}
                    onFailure={notResponseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
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

export default withStyles(styles, { withTheme: true })(LogIn);
