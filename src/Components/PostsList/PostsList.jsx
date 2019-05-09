import React, { Component } from "react";
import Post from "./Post/Post";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPosts(
      "https://delfinkitrainingapi.azurewebsites.net/api/post",
      sessionStorage.getItem("azure_access_token")
    );
  }

  render() {
    const { classes, posts } = this.props;
    return (
      <main className={classes.root}>
        <ul className={classes.list}>
          {posts.map(item => (
            <li key={item.Id}>
              <Post
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
