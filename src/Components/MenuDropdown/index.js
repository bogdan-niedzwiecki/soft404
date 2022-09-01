import { connect } from "react-redux";
import MenuDropdown from "./MenuDropdown";
import { deleteUserMiddleware } from "../actions/userActions";

// const mapStateToProps = state => { return { user: state.user } };

const mapDispatchToProps = dispatch => { return { deleteUser: () => dispatch(deleteUserMiddleware()) } };

export default connect(null, mapDispatchToProps)(MenuDropdown);
