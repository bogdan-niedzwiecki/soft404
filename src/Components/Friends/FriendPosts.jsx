import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {
  Typography,
  Avatar,
  CardMedia,
  Card,
  CardHeader,
  CardContent,
 } from "@material-ui/core";

class FriendPosts extends Component {
 
// ToDo friendPost filter function

  render() {
    const { classes,  friend_post_photo, friend_post_title, friend_post_text,friend_post_publishDate  } = this.props;
    return (
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
    );
  }
}



export default  withRouter(withStyles(styles)(FriendPosts));