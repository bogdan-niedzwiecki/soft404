import { connect } from "react-redux";
import { deletePostMiddleware } from "../actions/postActions";
import PostDeleteButton from "./PostDeleteButton";

const mapDispatchToProps = (dispatch) => ({
  deletePost: (formData) => dispatch(deletePostMiddleware(formData)),
});

export default connect(null, mapDispatchToProps)(PostDeleteButton);
