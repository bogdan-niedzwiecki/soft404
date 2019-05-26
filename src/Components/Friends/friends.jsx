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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { connect } from "react-redux";
import { friendsfilter } from "../actions/friendsAction";
import { withRouter } from "react-router-dom";
import { deleteFriendMiddleware } from "../actions/friendsAction";

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

    this.props.deleteFriendMiddleware(this.props.friend_id);
    this.props.history.push("/");
  };
  handleShow = () => {
    fetch(
      `https://delfinkitrainingapi.azurewebsites.net/api/friend/${
      this.props.friend_id
      }`,
      {
        method: "PUT",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        },
        body: JSON.stringify({
          Show:  true
        })
      }
    ).then(response => console.log(response));

  };

  render() {
    console.log("friend element " + this.props.posts);
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
            <Tooltip title="Show posts">
            <IconButton aria-label="Show"  size="small" color="primary" onClick={this.handleShow}>
          <ArrowDownwardIcon  />
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
            {"Personal information" }
          </DialogTitle>
          
          <DialogContent>
          <CardMedia
            className={classes.media}
            image={photo}
            titile={name}
          />
            <Typography gutterBottom variant="h5" component="h2">
              
              {name + " " + givenName }  
              
            </Typography>
            
            </DialogContent>
          </Dialog>
        </List>

        );
      }
    }

const mapDispatchToProps = dispatch => {
  return {
          friendsfilter: text => dispatch(friendsfilter(text)),
      deleteFriendMiddleware: friend_id => dispatch(deleteFriendMiddleware(friend_id))
    }
  };
  
  export default withRouter(connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(Friend)));
  
  // export default withRouter(withStyles(styles)(Friend));
