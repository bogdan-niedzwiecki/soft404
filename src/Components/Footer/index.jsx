import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing.unit,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div> 
        <footer className={classes.footer}>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            paragraph
          >
            Built with ❤️ by Soft404 team.
          </Typography>
        </footer>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Footer);
