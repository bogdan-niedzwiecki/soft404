import React from "react";
import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";  
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

class BurgerButton extends React.Component {

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick = {this.props.onClick}
          className={classes.menuButton}
        >
        <MenuIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BurgerButton);
