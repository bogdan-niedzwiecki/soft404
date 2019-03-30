import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import LogSwitch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Logo from "./Logo/index";
import BurgerButton from "./BurgerButton/index";
import Search from "./Search/index";
import AvatarMenu from "./AvatarMenu/index";
import LoginButton from "./LoginButton/index";
import AddPostButton from "./AddPostButton/index";
import NavItem from "./NavItem/index";
import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 180;

const styles = theme => ({
  root: {
    display: "flex"
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

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  greetings: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inline"
    }
  },
  loginSwitch: {
    marginLeft: 20
  }
});

class Header extends React.Component {
  state = {
    mobileOpen: false,
    auth: true
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  render() {
    const { classes, theme } = this.props;
    const { auth } = this.state;

    const drawer = (
      <div>
        <FormGroup className={classes.loginSwitch}>
          <FormControlLabel
            control={<LogSwitch checked={auth} onChange={this.handleChange} />}
            label={auth ? "Logout" : "Login"}
          />
        </FormGroup>
        <Divider />
        <List>
          <NavItem to="/" title="Home">
            <HomeIcon />
          </NavItem>
          <NavItem to="/posts" title="Posts">
            <InboxIcon />
          </NavItem>
          <NavItem to="/profile" title="My Profile">
            <AccountBoxIcon />
          </NavItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} color="default">
          <Toolbar>
            <BurgerButton onClick={this.handleDrawerToggle} />
            <Logo />
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Search />
              {auth && <AddPostButton />}
              {auth && (
                <AvatarMenu src="https://material-ui.com/static/images/avatar/1.jpg" />
              )}
              {!auth && <LoginButton />}
            </Grid>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
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
