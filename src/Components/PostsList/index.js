import { connect } from "react-redux";
import PostsList from "./PostsList";
import { getMyPostsMiddleware } from "../actions/postActions";

const mapStateToProps = state => {
  return {
    posts: state.allPosts
      .sort((a, b) => (a.PublishDate > b.PublishDate ? -1 : 1))
      .filter(
        post =>
          post.Title.toLowerCase().includes(state.mainSearch.toLowerCase()) ||
          post.Text.toLowerCase().includes(state.mainSearch.toLowerCase())
      ),
    me: state.me.Friend,
    friends: state.friends,
    userPhoto: state.me.Friend.Photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPosts: () => dispatch(getMyPostsMiddleware())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
