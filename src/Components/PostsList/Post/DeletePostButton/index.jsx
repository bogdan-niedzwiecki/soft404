import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { deletePostMiddleware } from "../../../actions/postActions";
import { withRouter } from "react-router";

class DeletePostButton extends Component {
  state = {
    open: false,
  };

  handleDeletePost = () => {
    let formData = new FormData();
    formData.append("post", JSON.stringify({ _id: this.props.delete_id }));
    this.props.deletePost(formData);
    this.props.history.push("/");
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Tooltip title="Delete post">
          <IconButton
            aria-label="Delete post"
            color="secondary"
            onClick={this.handleClickOpen}
            style={{ outline: "none" }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this post?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove this post from posts list ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeletePost} color="secondary">
              Delete
            </Button>
            <Button onClick={this.handleClose} color="default" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  deletePost: (delete_id) => dispatch(deletePostMiddleware(delete_id)),
});
export default withRouter(connect(null, mapDispatch)(DeletePostButton));
