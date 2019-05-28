import { connect } from "react-redux";
import Header from "./Header";
import { checkProfileMiddleware } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    user: state.me.Friend
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProfile: () => dispatch(checkProfileMiddleware())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
