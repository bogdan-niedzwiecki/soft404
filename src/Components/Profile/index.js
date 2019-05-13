import { connect } from "react-redux";
import Profile from "./Profile";
import { deleteUserFromApi } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUserFromApi: () => dispatch(deleteUserFromApi())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
