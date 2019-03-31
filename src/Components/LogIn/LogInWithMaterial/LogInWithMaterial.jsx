import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import styles from "./LogInWithMaterialStyle";


const responseGoogle = data => {
  fetch("https://delfinkitrainingapi.azurewebsites.net/.auth/login/google", {
    method: "POST",
    body: JSON.stringify({
      id_token: data.tokenId
    })
  }).then(responce =>
    responce.json().then(resp =>
      this.setState({
        hasLogIn: true
      })
    )
  );
};



function LogIn(props) {
  const { classes } = props;

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in By Google
          </Typography>
          <form className={classes.form}>
            <GoogleLogin
              clientId="576077564511-fd1t0nbqe1av9rr70to25hnuce1j0mg7.apps.googleusercontent.com"
              buttonText="LoginIfYouareLucky"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            {this.state.hasLogIn ? (
                <Redirect to="/home" />
              ) : (
                <React.Fragment />
              )} 
          </form>
        </Paper>
      </main>
    </Grid>
  );
}

// SignIn.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(LogIn);
