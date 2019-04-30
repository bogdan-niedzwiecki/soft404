import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "@material-ui/core";

class DeletePostButton extends React.Component {
  state = {
    open: false
  };
  constructor(props) {
    super(props);
    this.deletePost = this.deletePost.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deletePost() {
    fetch(
      `https://delfinkitrainingapi.azurewebsites.net/api/post/${
        this.props.delete_id
      }`,
      {
        method: "DELETE",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        }
      }
    )
      .then(r => console.log(r))
      .then(this.handleClose);
  }

  render() {
    return (
      <div>
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete post"
            color="secondary"
            onClick={this.handleClickOpen}
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
            <Button onClick={this.deletePost} color="secondary">
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
export default DeletePostButton;
