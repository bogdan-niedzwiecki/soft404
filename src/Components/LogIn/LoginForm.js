import React from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import SighIn from "./LogInStyle";
import { Grid } from "@material-ui/core";
// import  style from "./StyleForLogIn";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";


class LoginButton extends React.Component {
  render() {
    const responseGoogle = data => {
      fetch(
        "https://delfinkitrainingapi.azurewebsites.net/.auth/login/google",
        {
          method: "POST",
          body: JSON.stringify({
            id_token: data.tokenId
          })
        }
      ).then(responce =>
        responce.json().then(resp =>
          this.setState({
            hasLogIn: true
          })
        )
      )
        }
    return (
      // <Grid
      //   container
      //   direction="column"
      //   justify="space-around"
      //   alignItems="center"
      // >
      //   <SighIn>Nice SighIn form</SighIn>
      //   <React.Fragment>
      //          <GoogleLogin
      //             clientId="576077564511-fd1t0nbqe1av9rr70to25hnuce1j0mg7.apps.googleusercontent.com"
      //             buttonText="Login"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
      //             onSuccess={responseGoogle}
      //             onFailure={responseGoogle}
      //           />
      //         </React.Fragment>

      //    {this.state.hasLogIn ? (
      //           <Redirect to="/home" />
      //         ) : (
      //           <React.Fragment />
      //         )} 



      // </Grid>

<MDBContainer>
<MDBRow>
  <MDBCol md="12">
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
        <div className="text-center mb-3">
          <MDBBtn
            type="button"
            gradient="blue"
            rounded
            className="btn-block z-depth-1a"
          >
            Sign in
          </MDBBtn>
        </div>
        <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

          or Sign in with:
        </p>
        <div className="row my-3 d-flex justify-content-center">
          <MDBBtn
            type="button"
            color="white"
            rounded
            className="mr-md-3 z-depth-1a"
          >
            <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
          </MDBBtn>
          <MDBBtn
            type="button"
            color="white"
            rounded
            className="mr-md-3 z-depth-1a"
          >
            <MDBIcon fab icon="twitter" className="blue-text" />
          </MDBBtn>
          <MDBBtn
            type="button"
            color="white"
            rounded
            className="z-depth-1a"
          >
            <MDBIcon fab icon="google-plus-g" className="blue-text" />
        
          </MDBBtn>
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

LoginButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default LoginButton;
