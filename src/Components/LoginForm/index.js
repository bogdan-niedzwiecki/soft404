import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { getTokenMiddleware } from "../../store/actions/user";

const mapStateToProps = state => {
  return {
    user: state.user
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
