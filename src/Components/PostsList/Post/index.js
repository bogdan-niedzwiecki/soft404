import { connect } from "react-redux";
import Post from "./Post";
// import { getMyPostsMiddleware } from "../actions/postActions";

const mapStateToProps = state => {
  return {
    me: state.me,
    friends: state.friends
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getAllPosts: () => dispatch(getMyPostsMiddleware())
//   };
// };

export default connect(
  mapStateToProps,
  null
  //   mapDispatchToProps
)(Post);
