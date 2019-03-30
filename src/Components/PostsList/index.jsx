import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Post from "./Post/index";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 180
    }
  },
});



class PostsList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Post/>
          <Post/>
          <Post/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
