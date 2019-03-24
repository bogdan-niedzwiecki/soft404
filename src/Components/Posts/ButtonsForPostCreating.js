import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  root: {
    width: 500
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  input: {
    display: "none"
  }
});

function PositionedTooltips(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item>
        <Tooltip title="SaveME!" placement="bottom-end">
            <Button variant="contained" size="small" className={classes.button}>
              Save
            <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
            </Button>
            </Tooltip>
          <Tooltip title="Cancel" placement="bottom-end">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
            
          </Tooltip>
          <Tooltip title="Input Photo" placement="bottom-end">
          {/* <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
            />  */}
            {/* <label htmlFor="icon-button-file"> */}
              <IconButton
                color="primary"
                className={classes.button}
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            {/* </label> */}
            </Tooltip>
    
        </Grid>
      </Grid>
    </div>
  );
}

PositionedTooltips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PositionedTooltips);
