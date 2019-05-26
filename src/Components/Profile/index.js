import { connect } from "react-redux";
import Profile from "./Profile";
import { deleteUserMiddleware } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    user: state.me.Friend
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: () => dispatch(deleteUserMiddleware())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
