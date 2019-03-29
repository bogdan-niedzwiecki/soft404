import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./NewPostStyles";
import TextField from "@material-ui/core/TextField";
import PositionedTooltips from "./ButtonsForpostCreating/ButtonsForPostCreating";
import Grid from "@material-ui/core/Grid";

import CssBaseline from "@material-ui/core/CssBaseline";

class NewPost extends React.Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <form className={classes.container} noValidate autoComplete="off">
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="center"
            >
              <TextField
                id="outlined-required"
                label="Title of the Post"
                placeholder="Somewhere in the space"
                onChange={this.handleChange("name")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Text"
                style={{ margin: 8 }}
                placeholder="I was a monday, day like any athore day"
                helperText="Just put some text here!"
                rows="10"
                rowsMax="1000"
                multiline
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <PositionedTooltips />
            </Grid>
          </form>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(NewPost);
