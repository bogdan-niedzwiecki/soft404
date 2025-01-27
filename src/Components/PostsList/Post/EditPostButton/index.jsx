import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../../NewPost/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  CardActions,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import { editPostMiddleware } from "../../../actions/postActions";
import { connect } from "react-redux";

class EditPostButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      thumbnail: null,
      post: {
        title: this.props.title,
        text: this.props.text,
      },
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      post: {
        ...this.state.post,
        [event.target.id]: event.target.value,
      },
    });
  };

  handlePhotoChange = (event) => {
    this.setState({ thumbnail: event.target.files[0] });
  };

  handleDataReset = () => {
    this.setState({
      post: {
        title: "",
        text: "",
      },
    });
  };

  validateTitle = (messagesArray) => {
    if (
      10 > this.state.post.title.length ||
      this.state.post.title.length > 150
    ) {
      messagesArray.push(
        " Title can contain between 10 and 150 characters. Please do what you should t do!\n "
      );
    }
  };

  validateText = (messagesArray) => {
    if (this.state.post.text.length > 1000) {
      messagesArray.push(
        "Post's content can contain max 1000 characters. Stop It\n"
      );
    }
  };

  handleChangePost = (event) => {
    event.preventDefault();
    const messagesForUser = [];
    this.validateTitle(messagesForUser);
    this.validateText(messagesForUser);
    if (messagesForUser.length) {
      // alert(messagesForUser);
      // return;
    }
    let formData = new FormData();
    if (this.state.thumbnail) {
      formData.append("photo", this.state.thumbnail);
    }
    formData.append(
      "post",
      JSON.stringify({ ...this.state.post, _id: this.props.delete_id })
    );
    this.props.editPost(formData);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    const { title, text } = this.state.post;
    return (
      <div>
        <Tooltip title="Edit post">
          <IconButton
            aria-label="Edit post"
            color="primary"
            size="madium"
            onClick={this.handleClickOpen}
            style={{ outline: "none" }}
          >
            <EditIcon color="primary" />
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
          <DialogTitle style={{ textAlign: "center", marginTop: "3%" }}>
            {"Editing Post"}
          </DialogTitle>
          <DialogContent>
            <div className={classes.toolbar} />
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="stretch"
            >
              <TextField
                id="title"
                label="Title of the Post"
                placeholder="Somewhere in the space"
                margin="normal"
                variant="outlined"
                value={title}
                onChange={this.handleChange}
                required={true}
                inputProps={{ maxLength: 150 }}
              />

              <TextField
                id="text"
                label="Content of the Post"
                placeholder="It was a monday, day like any other day"
                rows="10"
                rowsMax="13"
                required={true}
                multiline
                margin="normal"
                variant="outlined"
                value={text}
                onChange={this.handleChange}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <CardActions className={classes.footer}>
              <Button
                variant="outlined"
                aria-label="Save"
                size="medium"
                color="primary"
                autoFocus
                type="submit"
                onClick={this.handleChangePost}
              >
                Save
                <SaveIcon />
              </Button>
              <Tooltip title="Cancel" placement="bottom">
                <IconButton
                  aria-label="Delete"
                  onClick={this.handleDataReset}
                  color="secondary"
                  size="medium"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <input
                component="span"
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={this.handlePhotoChange}
              />
              <label htmlFor="raised-button-file">
                <Tooltip title="Upload Photo" placement="bottom">
                  <IconButton
                    variant="contained"
                    color="primary"
                    component="span"
                    size="medium"
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </Tooltip>
              </label>
            </CardActions>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  editPost: (delete_id, formData) =>
    dispatch(editPostMiddleware(delete_id, formData)),
});

export default connect(null, mapDispatch)(withStyles(styles)(EditPostButton));
