import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { validateTokenMiddleware } from "../actions/userActions";

const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispatchToProps = dispatch => {
  return { addUser: googleToken => dispatch(validateTokenMiddleware(googleToken)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
