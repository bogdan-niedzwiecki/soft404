import { connect } from "react-redux";
import NewPost from "./NewPost";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { withRouter } from "react-router-dom";
import { addPostMiddleware } from "../actions/postActions";

const mapDispatch = (dispatch) => ({
  addPost: (formData) => dispatch(addPostMiddleware(formData)),
});

export default withRouter(
  connect(null, mapDispatch)(withStyles(styles)(NewPost))
);

