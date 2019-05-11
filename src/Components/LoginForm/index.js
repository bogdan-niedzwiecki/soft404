import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { getTokenMiddleware } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    token: state.user.Token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToken: (url, googleToken) =>
      dispatch(getTokenMiddleware(url, googleToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
