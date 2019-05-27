import React, { Component } from "react";
import Post from "./Post";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Helmet } from "react-helmet";

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.props.getAllPosts();
  }

  render() {
    const { classes, posts, userPhoto } = this.props;
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
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
