import { connect } from "react-redux";
import { withRouter } from "react-router";
import EditProfile from "./EditProfile";
import { addProfileMiddleware } from "../../actions/userActions";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProfile: (name, givenName, photo) =>
      dispatch(addProfileMiddleware(name, givenName, photo))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfile)
);
