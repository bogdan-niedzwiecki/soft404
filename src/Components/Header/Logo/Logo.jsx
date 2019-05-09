import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class Logo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Avatar
          alt="Soft404 logo"
          className={classes.logo}
          src="https://pugofka.com/upload/iblock/bb0/404_error.png"
          component={NavLink}
          to="/"
        />
      </div>
    );
  }
}

export default withStyles(styles)(Logo);
