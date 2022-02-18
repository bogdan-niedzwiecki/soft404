import { connect } from "react-redux";
import Header from "./Header";
import { addUserMiddleware } from "../actions/userActions";

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return { addUser: () => dispatch(addUserMiddleware()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
