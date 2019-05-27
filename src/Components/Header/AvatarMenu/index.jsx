import React, { Component } from "react";
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
import styles from "./styles";

class AvatarMenu extends Component {
  state = {
    anchorEl: null
  };

  removeUserStorage = () => {
    sessionStorage.removeItem("azure_access_token");
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const { classes, user } = this.props;
    return (
      <div>
        <Tooltip title={`Hello, ${user.Name}`}>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleClick}
            color="inherit"
            style={{ outline: 0 }}
          >
            <Avatar
              alt="user photo"
              className={classes.avatar}
              src={user.Photo}
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
