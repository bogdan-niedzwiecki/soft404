import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import styles from "./styles";
import { withRouter } from "react-router-dom";

class Search extends React.Component {
  state = {
    filterText: this.props.filterText
  };

  handleChange = event => {
    this.props.history.push("/");
    this.setState(
      {
        filterText: event.target.value
      },
      () =>
        setTimeout(() => {
          this.props.filterPosts(this.state.filterText);
        }, 500)
    );
  };

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
          onChange={this.handleChange}
          value={this.state.filterText}
        />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Search));
