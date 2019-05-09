import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import AvatarMenu from "./AvatarMenu/AvatarMenu";
import AddPostButton from "./AddPostButton/AddPostButton";
import styles from "./styles";

class Header extends Component {
  render() {
    const { classes } = this.props;

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
              <AvatarMenu />
            </Grid>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
