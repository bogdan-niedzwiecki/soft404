import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";

class DeletePostButton extends Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  deletePost = event => {
    event.preventDefault();
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
      .then(console.log(this.props.delete_id))
      .then(this.handleClick);
  };

  render() {
    return (
      <div>
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete post"
            color="secondary"
            onClick={this.handleClick}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={this.state.open}
          onClose={this.handleClick}
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
            <Button onClick={this.handleClick} color="default" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default DeletePostButton;
