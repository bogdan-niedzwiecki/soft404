import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { TextField, Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { getFriendsMiddleware } from "../actions/friendsAction";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class FriendsList extends Component {
  state = {
    friends: {
      Name: ""
    },
    dense: false,
    secondary: false
  };

  //   componentDidMount() {
  //     this.props.getFriends();
  //   }

  handlerChange = () => {
    this.props.getFriendsMiddleware();
  };
  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <main>
        <ul>
          <button onClick={this.handlerChange}> Frinds </button>
          <TextField
            id="text"
            label="Content of the Post"
            placeholder="It was a monday, day like any other day"
            rows="10"
            rowsMax="13"
            required={true}
            multiline
            margin="normal"
            variant="outlined"
            value={this.state.friends.Name}
            onChange={this.handleChange}
          />
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Friends
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
          </Grid>
        </ul>
      </main>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getFriendsMiddleware: () => dispatch(getFriendsMiddleware())
  };
};

export default connect(
  null,
  mapDispatch
)(withStyles(styles)(FriendsList));
