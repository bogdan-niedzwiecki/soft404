import React from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  inline: {
    marginRight: 20
  }
});

class AddPostButton extends React.Component {
  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <Button
          color="inherit"
          component={NavLink}
          to="/addPost"
          className={classes.inline}
        >
          Add Post
        </Button>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(AddPostButton);
