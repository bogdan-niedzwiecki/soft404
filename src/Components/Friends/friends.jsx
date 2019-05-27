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
  Card,
  CardHeader,
  CardContent,
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
    friendsfilter: this.props.friendsfilter
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleChange = event => {
    this.props.history.push("/");
    this.setState(
      {
        friendsfilter: event.target.value
      },
      () =>
        setTimeout(() => {
          this.props.friendsfilter(this.state.friendsfilter);
        }, 500)
    );
  };

  handleDelete = () => {
    this.props.removeFromFriendsMiddleware(this.props.friend_id);
    this.props.history.push("/");
  };

  handleShow = () => {
    this.props.showingMiddleware(this.props.friend_id);
    this.props.history.push("/");

  };
  handleHide = () => {
    this.props.hidingMiddleware(this.props.friend_id);
    this.props.history.push("/");
  };

  isVisibility = show =>{
     console.log("my freinds "+ this.props);
    return this.props.show;
  }

  render() {
    console.log("friend element " + this.props.posts);
    const { classes, name, givenName, photo, show, friend_post_id, friend_post_userId, friend_post_photo, friend_post_title, friend_post_text,friend_post_publishDate } = this.props;
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
              {this.isVisibility(show)  ? (
                  <Tooltip title="Show posts" >
                  <IconButton aria-label="Show" size="small" color="primary" onClick={this.handleShow}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                  ) : (
                    <Tooltip title="Hide posts">
                    <IconButton aria-label="Hide" size="small" color="secondary" onClick={this.handleHide}>
                      <VisibilityOffIcon />
                    </IconButton>
                  </Tooltip>
                )}

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
            <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Post"
              className={classes.avatar}
              src={friend_post_photo}
            />
          }
          title={friend_post_title}
          subheader={friend_post_publishDate}
        />
          <CardMedia className={classes.media} image={friend_post_photo} />
          <CardContent>
            <Typography paragraph className={classes.text}>
              {friend_post_text}
            </Typography>
          </CardContent>
      
      
      </Card>

          </DialogContent>
        </Dialog>
      </List>

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    friendsfilter: text => dispatch(friendsfilter(text)),
    removeFromFriendsMiddleware: friend_id => dispatch(removeFromFriendsMiddleware(friend_id)),
    showingMiddleware: friend_id => dispatch(showingMiddleware(friend_id)),
    hidingMiddleware: friend_id => dispatch(hidingMiddleware(friend_id))

  }
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Friend)));

  // export default withRouter(withStyles(styles)(Friend));
