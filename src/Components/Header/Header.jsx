import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Logo from "./Logo/index";
import Search from "./Search/index";
import styles from "./styles";
import AvatarMenu from "./AvatarMenu/index";
import AddPostButton from "./AddPostButton/index";

class Header extends Component {
  constructor(props) {
    super(props);
    this.props.addUser();
  }
  
  render() {
    const { classes, user } = this.props;
    return (
      <header className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Logo />
              <Search />
              <AddPostButton />
              <AvatarMenu user={user} />
            </Grid>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
