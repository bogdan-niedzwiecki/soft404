import { connect } from "react-redux";
import { editPostMiddleware, deletePostMiddleware } from "../actions/postActions";
import PostDropdown from "./PostDropdown";

const mapDispatchToProps = (dispatch) => ({
  editPost: (formData) => dispatch(editPostMiddleware(formData)),
  deletePost: (formData) => dispatch(deletePostMiddleware(formData))
});

export default connect(null, mapDispatchToProps)(PostDropdown);
