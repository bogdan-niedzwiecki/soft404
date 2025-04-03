import { connect } from "react-redux";
import PostBox from "./PostBox";
import { addPostMiddleware } from "../actions/postActions";

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  addPost: (formData) => dispatch(addPostMiddleware(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostBox);
