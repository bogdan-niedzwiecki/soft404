import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import GoogleLogin from "react-google-login";
import { BrowserRouter, Redirect } from "react-router-dom";

// const styles = theme => ({
//   main: {
//     width: "auto",
//     display: "block",
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: 400,
//       marginLeft: "auto",
//       marginRight: "auto"
//     }
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
//       .spacing.unit * 3}px`
//   },
//   avatar: {
//     margin: theme.spacing.unit,
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: "100%",
//     marginTop: theme.spacing.unit
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3
//   }
// });
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
      );
      return (
        <main /*className={classes.main}*/>
          <CssBaseline />
          <Paper /*className={classes.paper}*/>
            <Avatar /*className={classes.avatar}*/>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in by Google. Good Luck with That!
            </Typography>
            <form className={classes.form}>
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
            </form>
          </Paper>
        </main>
      );
    };
  }
}

LoginButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginButton);
