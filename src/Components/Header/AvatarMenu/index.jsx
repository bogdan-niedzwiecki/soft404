import React from "react";
import {
  IconButton,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Menu,
  Avatar,
  Tooltip
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LogoutIcon from "@material-ui/icons/Input";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
const styles = () => ({
  avatar: {
    margin: -8
  }
});

class AvatarMenu extends React.Component {
  state = {
    anchorEl: null
  };

  removeUserStorage = () => {
    sessionStorage.removeItem("azure_access_token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("surname");
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("email");
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Tooltip title={`Hello, ${sessionStorage.getItem("name")}`}>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleClick}
            color="inherit"
            style={{ outline: 0 }}
          >
            <Avatar
              alt="user photo"
              className={classes.avatar}
              src={sessionStorage.getItem("avatar")}
            />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClick={this.handleClose}
          onClose={this.handleClose}
        >
          <MenuItem component={NavLink} to="/profile">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="My profile"
            />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/logout"
            onClick={this.removeUserStorage}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Sign out"
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(AvatarMenu);
