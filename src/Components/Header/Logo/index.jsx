import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  logo: {
    display: "none",
    left: 0,
    // marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
      width: 60,
      height: 60,
      left: 0,
    }
  }
});

class Logo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Avatar
          alt="Soft 404"
          className={classes.logo}
          src="https://cdn3.iconfinder.com/data/icons/hosting-glyphs/60/error__attack__dos_404_-512.png"
          component={NavLink}
          to="/"
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Logo);
