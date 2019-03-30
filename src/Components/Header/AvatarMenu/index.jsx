import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LogoutIcon from "@material-ui/icons/Input";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  avatar: {
    margin: -10,
  }
});

class AvatarMenu extends React.Component {
  state = {
    anchorEl: null,
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
        <Tooltip title="Hello, <user_name>">
        <IconButton
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <Avatar
            alt="Remy Sharp"
            className={classes.avatar}
            src={this.props.src}
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
          <MenuItem component={NavLink} to="/logout">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Logout"
              component={NavLink} to="/logout"
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AvatarMenu);
