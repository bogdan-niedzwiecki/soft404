import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
const styles = () => ({
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: 40,
    right: 100
  },
});

class AddPostButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab color="secondary" aria-label="Add" className={classes.fabButton} component={NavLink}
          to="/addPost">
            <AddIcon />
        </Fab>
      </div>
    );
  }
}
export default withStyles(styles)(AddPostButton);
