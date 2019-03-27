import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        display: "block",    
    },
    footer: {
        backgroundColor: theme.palette.background.default,
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
        [theme.breakpoints.up("sm")]: {
            marginLeft: 240
        }
    },
});


class Footer extends React.Component {

    render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <CssBaseline />
            <footer className={classes.footer} >
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Built with ❤️ by Soft404 team.
                </Typography>
            </footer>
           </div>
        );
    }
    
}
export default withStyles(styles, { withTheme: true })(Footer);
    
   
