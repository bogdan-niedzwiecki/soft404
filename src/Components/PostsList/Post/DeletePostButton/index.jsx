<<<<<<< HEAD
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
<<<<<<< HEAD
import Tooltip from "@material-ui/core/Tooltip";
=======
import { Tooltip } from "@material-ui/core";
>>>>>>> postsList
=======
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from "react-router";
import { Tooltip } from '@material-ui/core';
>>>>>>> 2edff0813f9000172cd742dc714fce4b52d8e361

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

  deletePost(event) {
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
      .then(this.handleClose);
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete post"
<<<<<<< HEAD
            onClick={this.handleClickOpen}
            color="secondary"
=======
            color="secondary"
            onClick={this.handleClickOpen}
>>>>>>> postsList
          >
            <DeleteIcon />
          </IconButton>
=======
        
        <Tooltip title="Delete">
        <IconButton aria-label="Delete post" color="secondary" onClick={this.handleClickOpen}>
            <DeleteIcon />
        </IconButton>
>>>>>>> 2edff0813f9000172cd742dc714fce4b52d8e361
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
<<<<<<< HEAD
export default DeletePostButton;
=======
export default withRouter(DeletePostButton);
>>>>>>> 2edff0813f9000172cd742dc714fce4b52d8e361
