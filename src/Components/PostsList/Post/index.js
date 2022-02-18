import { connect } from "react-redux";
import Post from "./Post";

const mapStateToProps = state => {
  return {
    posts: state.user.posts
  };
};

export default connect(mapStateToProps, null)(Post);
