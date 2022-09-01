import { connect } from "react-redux";
import { editPostMiddleware } from "../actions/postActions";
import PostEditButton from "./PostEditButton";

const mapDispatchToProps = (dispatch) => ({ editPost: (formData) => dispatch(editPostMiddleware(formData)) });

export default connect(null, mapDispatchToProps)(PostEditButton);
