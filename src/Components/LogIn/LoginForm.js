import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";


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
        <div>
           {/* <Typography component="h1" variant="h5">
              Sign in by Google. Good Luck with That!
            </Typography> */}
            <React.Fragment>
               <GoogleLogin
                  clientId="576077564511-fd1t0nbqe1av9rr70to25hnuce1j0mg7.apps.googleusercontent.com"
                  buttonText="Login"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />

             
              
              </React.Fragment>

              {this.state.hasLogIn ? (
                <Redirect to="/home" />
              ) : (
                <React.Fragment />
              )}
              </div>
          
      );

    };
  }





LoginButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default LoginButton;
