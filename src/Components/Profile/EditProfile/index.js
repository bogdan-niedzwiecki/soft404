import { connect } from "react-redux";
import { withRouter } from "react-router";
import EditProfile from "./EditProfile";
import { addProfileMiddleware } from "../../actions/userActions";

const mapStateToProps = state => {
  return {
    user: state.me.Friend
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProfile: formData => dispatch(addProfileMiddleware(formData))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfile)
);
