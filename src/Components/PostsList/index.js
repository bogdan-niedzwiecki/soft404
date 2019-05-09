import { connect } from "react-redux";
import PostsList from "./PostsList";
import { postsFetchData } from "../../store/actions/posts";

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: (url, token) => dispatch(postsFetchData(url, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
