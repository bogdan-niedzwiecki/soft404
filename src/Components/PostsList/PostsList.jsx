import React, { Component } from "react";
import Post from "./Post/index";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Helmet } from "react-helmet";
import Friend from "../Friends/friends";

class PostsList extends Component {

  constructor(props) {
    super(props);
    this.props.getPosts();
  }


  info = () => <p>Sorry you don't have any friends...</p>;

  render() {
    const { classes, posts, userPhoto, friends } = this.props;
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
              />
            ))
          : this.info()} 
          </div>
      </main >
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
