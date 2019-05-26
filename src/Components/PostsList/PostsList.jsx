import React, { Component } from "react";
import Post from "./Post/index";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Helmet } from "react-helmet";
import Friend from "../Friends/friends";
import FriendsList from "../Friends/FriendsList";
class PostsList extends Component {

  constructor(props) {
    super(props);
    this.props.getPosts();
    this.props.getFriends();
  }
  // componentDidUpdate() {
  //   this.props.getFriends();
  // }

  info = () => <p>Sorry you don't have any friends...</p>;

  render() {
    const { classes, posts, userPhoto, friends } = this.props;
    // console.log("my friend info - " + this.props.friends);
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
     
        <div className={classes.container}> 
          {/* <FriendsList /> */}
          {friends.map(item => (
            <Friend
              friend_id={item.Id}
              name={item.Name}
              givenName={item.GivenName}
              photo={item.Photo}  
              show={item.Show}
            />
          )) }
          </div>
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
