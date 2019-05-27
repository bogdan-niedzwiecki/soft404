import React, { Component } from "react";
import Post from "./Post";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Helmet } from "react-helmet";
import Friend from "../Friends/friends";

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.props.getAllPosts();
  }


  info = () => <p>Sorry you don't have any friends...</p>;

  render() {
    const { classes, posts, userPhoto, friends } = this.props;
    return (

      <main className={classes.root}>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <ul className={classes.list}>

          {posts.map(item => (
            <li key={item.Id}>
              <Post
                userPhoto={userPhoto}
                id={item.Id}
                title={item.Title}
                thumbnailPhoto={item.ThumbnailPhoto}
                text={item.Text}
                publishDate={item.PublishDate}
              />
            </li>
          ))}
        </ul>
        <p className={classes.search}>My friends:</p>
        <div className={classes.container} >
          
          {friends.length !== 0
            ?
            friends.map(item => (
              <Friend
                friend_id={item.Friend.Id}
                name={item.Friend.Name}
                givenName={item.Friend.GivenName}
                photo={item.Friend.Photo}
                show={item.Friend.Show}

                friend_post_id={item.Posts.Id}
                friend_post_userId={item.Posts.UserId}
                friend_post_photo={item.Posts.ThumbnailPhoto}
                friend_post_title={item.Posts.Title}
                friend_post_text={item.Posts.Text}
                friend_post_publishDate={item.Posts.PublishDate}
              />
            ))
          : this.info()} 
          </div>
      </main >
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
