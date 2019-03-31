import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./ButtonsForPostCreatingStyle";
import { NavLink } from "react-router-dom";

function ButtonsForCreatingPost (props) {

    const { classes } = props;
    return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item>
          <Tooltip title="SaveME!" placement="bottom-end">
            <Button variant="contained" size="small" className={classes.button} component={NavLink} to="/posts">
              Save
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
            </Button>
          </Tooltip>
          {/* <AlertForPost /> */}
          <Tooltip title="Cancel" placement="bottom-end"  >
            <IconButton aria-label="Delete" component={NavLink} to="/">
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
            <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              className={classes.button}
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            </label>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}






export default withStyles(styles)(ButtonsForCreatingPost);
