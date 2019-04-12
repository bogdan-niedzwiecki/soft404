import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing.unit * 4,
    padding: `${theme.spacing.unit * 6}px 0 ${theme.spacing.unit * 7}px`
  }
});

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    if (sessionStorage.getItem("access_token")) {
      return (
        <footer className={classes.root}>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            paragraph
          >
            Built with ❤️ by Soft404 team.
          </Typography>
        </footer>
      );
    } else {
      return (<footer/>);
    }
  }
}
export default withStyles(styles, { withTheme: true })(Footer);
