import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
const styles = () => ({
  fabButton: {
    position: "fixed",
    zIndex: 1,
    bottom: 30,
    right: 30
  },
});

class AddPostButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab color="secondary" aria-label="Add" className={classes.fabButton} component={NavLink}
          to="/addPost">
            <CreateIcon />
        </Fab>
      </div>
    );
  }
}
export default withStyles(styles)(AddPostButton);
