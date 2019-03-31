import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import LogSwitch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Logo from "./Logo/index";
import Search from "./Search/index";
import AvatarMenu from "./AvatarMenu/index";
import LoginButton from "./LoginButton/index";
import AddPostButton from "./AddPostButton/index";

const styles = theme => ({
  loginSwitch: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: 100
  }
});

class Header extends React.Component {
  state = {
    auth: false
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { auth } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar} color="default">
          <Toolbar>
            {/*Fake Login  */}
            <FormGroup className={classes.loginSwitch}>
              <FormControlLabel
                control={
                  <LogSwitch checked={auth} onChange={this.handleChange} />
                }
              />
            </FormGroup>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Logo />
              <Search />
              {auth && (
                <div>
                  <AddPostButton />
                  <AvatarMenu src="https://material-ui.com/static/images/avatar/1.jpg" />
                </div>
              )}
              {!auth && <LoginButton />}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
