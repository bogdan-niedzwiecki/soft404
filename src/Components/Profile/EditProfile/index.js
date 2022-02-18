import { connect } from "react-redux";
import { withRouter } from "react-router";
import EditProfile from "./EditProfile";
import { editUserMiddleware } from "../../actions/userActions";

const mapStateToProps = state => { return { user: state.user }; };

const mapDispatchToProps = dispatch => { return { editUser: formData => dispatch(editUserMiddleware(formData)) } };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
