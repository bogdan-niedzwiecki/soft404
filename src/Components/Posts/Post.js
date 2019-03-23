import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PositionedTooltips from "./ButtonsForPostCreating";
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 1,
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  paper: {
    height: 300,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class OutlinedTextFields extends React.Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
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
          className={classes.textField}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Text"
          className={classes.textField}
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
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedTextFields);
