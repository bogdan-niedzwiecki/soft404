import { connect } from "react-redux";
import Post from "./Post";

const mapStateToProps = state => {
  return {
    avatar: state.user.Photo
  };
};

export default connect(mapStateToProps)(Post);
