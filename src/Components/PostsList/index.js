import { connect } from "react-redux";
import PostsList from "./PostsList";
import { getAllPostsFromApi } from "../actions/postActions";

const mapStateToProps = state => {
  return {
    posts: state.me.Posts.filter(
      post =>
        post.Title.toLowerCase().includes(state.filterText.toLowerCase()) ||
        post.Text.toLowerCase().includes(state.filterText.toLowerCase())
    ),
    userPhoto: state.me.Friend.Photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => dispatch(getAllPostsFromApi())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
