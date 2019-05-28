import React, { Component } from "react";
import Post from "./Post";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Helmet } from "react-helmet";
import Friend from "../Friends/friends";
import TextField from "@material-ui/core/TextField";

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.props.getAllPosts();
    this.state = {
    friendsfilter: this.props.filterText,
    text: ""
  };
  }

  handleChange = event => {
    
    this.setState(
      {
        friendsfilter: event.target.value
      },
      () =>
        setTimeout(() => {
          this.props.friendsfilter(this.state.filterText);
        }, 500)
        
    );
    console.log(this.state.friendsfilter);
  };




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
       
        <div className={classes.container} >
        <TextField
          className={classes.rootInput}
          value={this.state.filterText}
          onChange={this.handleChange}
          id="search-field"
          placeholder="Find your friends "
        />
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
