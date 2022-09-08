import { connect } from "react-redux";
import MenuDropdown from "./MenuDropdown";
import { deleteUserMiddleware } from "../actions/userActions";

const mapStateToProps = state => {
  const { picture, family_name, given_name } = state.user;
  return {
    picture,
    family_name,
    given_name
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: () => dispatch(deleteUserMiddleware())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDropdown);
