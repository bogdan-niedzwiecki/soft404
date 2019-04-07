import React from "react";
import { IconButton, MenuItem, ListItemText, ListItemIcon, Menu, Avatar, Tooltip} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LogoutIcon from "@material-ui/icons/Input";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import ProfileArea from "../../Profile/ProfileArea";
// import avatar from "../../Images/Avatar.jpg"
const styles = () => ({
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
        <Tooltip title={ProfileArea.username="Morty"}  
          >
        <IconButton
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <Avatar
            alt="NEO"
            className={classes.avatar}
            src={this.props.src}
            // image={avatar}
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

export default withStyles(styles)(AvatarMenu);
