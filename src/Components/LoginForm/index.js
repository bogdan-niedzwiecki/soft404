import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { getTokenMiddleware } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: googleToken => dispatch(getTokenMiddleware(googleToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
