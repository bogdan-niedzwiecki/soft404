import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import styles from "./styles";

class Search extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Search);
