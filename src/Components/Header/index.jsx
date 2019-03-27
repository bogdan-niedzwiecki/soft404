import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LogoutIcon from "@material-ui/icons/Input";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LogSwitch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from '@material-ui/core/Avatar';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch,
  NavLink
} from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",    
  },
  grow: {
    flexGrow: 1
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  avatar: {
    margin: -5,
  },
  logo: {
      width: 60,
      height: 60, 
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  greetings : {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inline",
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  search: {
    position: "relative",    
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 2,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "primary",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});



class Header extends React.Component {
  state = {
    mobileOpen: false,
    auth: true,
    anchorEl: null
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <FormGroup>
            <FormControlLabel
              control={
                <LogSwitch
                  checked={auth}
                  onChange={this.handleChange}
                  aria-label="LoginSwitch"
                />
              }
              label={auth ? "Logout" : "Login"}
            />
          </FormGroup>
        </div>
        <Divider />
        <List>
        <ListItem button key="Home" component={NavLink} to="/">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="Posts" component={NavLink} to="/posts">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
          <ListItem button key="Mail" component={NavLink} to="/mail">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Mail" />
          </ListItem>
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.grow}
            >
              <Avatar alt="Soft 404" className={classes.logo} src="https://cdn3.iconfinder.com/data/icons/hosting-glyphs/60/error__attack__dos_404_-512.png" component={NavLink} to="/"/>
            </Typography>

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
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar alt="Remy Sharp" className={classes.avatar} src="https://material-ui.com/static/images/avatar/1.jpg" />
                </IconButton>
                <Typography
                  inline
                  color="inherit"
                  noWrap
                  className={classes.grow}
                  className={classes.greetings}
                >
                  Hello, &lt;user_name&gt;
                </Typography>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      inset
                      primary="My profile"
                    />
                  </MenuItem>
                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      inset
                      primary="Logout"
                    />
                  </MenuItem>
                </Menu>
              </div>
            )}
            {!auth && (
              <div>
                <Button color="inherit" component={NavLink} to="/login">
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
