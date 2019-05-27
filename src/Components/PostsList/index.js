import { connect } from "react-redux";
import PostsList from "./PostsList";
import { getMyPostsMiddleware } from "../actions/postActions";
import { getFriendsPostsMiddleware } from "../actions/friendActions";

const mapStateToProps = state => {
  return {
    posts: state.me.Posts.filter(
      post =>
        post.Title.toLowerCase().includes(state.mainSearch.toLowerCase()) ||
        post.Text.toLowerCase().includes(state.mainSearch.toLowerCase())
    ),

    friends: state.friends,

    userPhoto: state.me.Friend.Photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMyPosts: () => dispatch(getMyPostsMiddleware()),
    getFriendsPosts: () => dispatch(getFriendsPostsMiddleware())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
