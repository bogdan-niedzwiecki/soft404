import { connect } from "react-redux";
import PostsList from "./PostsList";
import { getPostsMiddleware } from "../../store/actions/posts";

const mapStateToProps = state => {
  return {
    posts: state.posts,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: (url, token) => dispatch(getPostsMiddleware(url, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);