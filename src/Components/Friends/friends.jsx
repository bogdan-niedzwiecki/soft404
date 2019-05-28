import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItem,
  Avatar,
  ListItemText,
  Grid,
  CardMedia,
  Tooltip,
  IconButton,
  DialogTitle,
  Dialog,
  DialogContent,

} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { connect } from "react-redux";
import { friendsfilter, removeFromFriendsMiddleware, showingMiddleware, hidingMiddleware } from "../actions/friendActions";
import { withRouter } from "react-router-dom";

class Friend extends Component {

  state = {
    friends: [],
    open: false,
    show: "true",
  };




  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.removeFromFriendsMiddleware(this.props.friend_id);
    this.props.history.push("/");
  };

  handleShow = () => {
    this.props.showingMiddleware(this.props.friend_id);

  };
  handleHide = () => {
    this.props.hidingMiddleware(this.props.friend_id);
  };

  isVisibility = show => {
    return this.props.friends.some(item => item.Friend.Show === show)
  }

  render() {
    const { classes, name, givenName, photo} = this.props;
    return (

      <List className={classes.container} >
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center">
          <ListItem button onClick={this.handleClickOpen}>
            <ListItemAvatar>
              <Avatar alt="user photo" src={photo} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography component="span" color="textPrimary">
                  {name} {givenName}
                </Typography>
              }
            />
          </ListItem>
          <ListItemSecondaryAction>
            <Tooltip title="Delete Friend">
              <IconButton
                color="secondary"
                size="small"
                onClick={this.handleDelete}
              >
                <DeleteIcon />
              </IconButton>

            </Tooltip>

           
               <Tooltip title="Hide posts">
                <IconButton aria-label="Hide" size="small" color="secondary" onClick={this.handleHide}>
                  <VisibilityOffIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Show posts" >
                  <IconButton aria-label="Show" size="small" color="primary" onClick={this.handleShow}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>

       
          </ListItemSecondaryAction>
        </Grid>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{ textAlign: "center", marginTop: "3%" }}>
            {"Personal information"}
          </DialogTitle>
          <DialogContent>
            <CardMedia
              className={classes.media}
              image={photo}
              titile={name}
            />
            <Typography gutterBottom variant="h5" component="h2">
              {name + " " + givenName}
            </Typography>

          </DialogContent>
        </Dialog>
      </List>

    );
  }
}

const mapStateToProps = state => {
  return {
    friends: state.friends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    friendsfilter: text => dispatch(friendsfilter(text)),
    removeFromFriendsMiddleware: friend_id => dispatch(removeFromFriendsMiddleware(friend_id)),
    showingMiddleware: friend_id => dispatch(showingMiddleware(friend_id)),
    hidingMiddleware: friend_id => dispatch(hidingMiddleware(friend_id))

  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Friend)));

