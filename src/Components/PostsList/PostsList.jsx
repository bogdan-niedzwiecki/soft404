import React, { Component } from "react";
import Post from "./Post/";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Helmet } from "react-helmet";
import Friends from "../Friends";
import TextField from "@material-ui/core/TextField";

class PostsList extends Component {
  componentDidMount() {
    this.props.getFriends();
  }

  handleChange = (e) => {
    this.props.setAsideSearch(e.target.value);
  };

  info = () => <p>No matches meeting your criteria</p>;

  render() {
    const { classes, posts, friends } = this.props;
    return (
      <main className={classes.root}>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <ul className={classes.list}>
          {posts?.length
            ? posts.map((post) => (
                <li key={post._id}>
                  <Post
                    _id={post._id}
                    userid={post.userid}
                    given_name={post.given_name}
                    family_name={post.family_name}
                    picture={post.picture}
                    title={post.title}
                    thumbnail={post.thumbnail}
                    text={post.text}
                    publish_date={post.publish_date}
                  />
                </li>
              ))
            : null}
        </ul>

        <div className={classes.container}>
          <TextField
            className={classes.rootInput}
            value={this.props.asideSearch}
            onChange={this.handleChange}
            id="search-field"
            placeholder="Find your friends"
          />
          {friends?.length
            ? friends.map((friend) => (
                <Friends
                  key={friend._id}
                  friend_id={friend._id}
                  name={friend.given_name}
                  givenName={friend.family_name}
                  photo={friend.picture}
                  show={friend.visible}
                />
              ))
            : this.info()}
        </div>
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
