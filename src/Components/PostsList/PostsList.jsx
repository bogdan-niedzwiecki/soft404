import React, { Component } from "react";
import Post from "./Post/index";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Helmet } from "react-helmet";
class PostsList extends Component {
  constructor(props) {
    super(props);
    this.props.getMyPosts();
    this.props.getFriendsPosts();
  }

  render() {
    const { classes, posts, userPhoto } = this.props;
    return (
      <main className={classes.root}>
        <Helmet>
          <title>Home page</title>
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
