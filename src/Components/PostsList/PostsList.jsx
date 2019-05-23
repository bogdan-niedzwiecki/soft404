import React, { Component } from "react";
import Post from "./Post/index";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Helmet } from "react-helmet";
import Friend from "../Friends/listOfFriends";
class PostsList extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getFriends();
  }

  render() {
    const { classes, posts, userPhoto, friends } = this.props;
    console.log("my friend info - " + this.props.friends);
    return (
      <main className={classes.root}>
        <Helmet>
          <title>HomePage</title>
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
        <ul className={classes.list}>
          {friends.map(item => (
            <li key={item.Name}>
              <Friend
                id={item.Id}
                name={item.Name}
                givenName={item.GivenName}
                photo={item.Photo}
                show={item.Show}
              />
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
