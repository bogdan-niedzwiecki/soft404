import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.root}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          paragraph
        >
          Built with
          <span role="img" aria-labelledby="footer-emoji">
            ❤️
          </span>
          by Soft404 team.
        </Typography>
      </footer>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Footer);
