import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Tooltip,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPostToAPI } from "./../actions/postActions";
import { Helmet } from "react-helmet";

class NewPost extends React.Component {
  state = {
    post: {
      title: "",
      text: "",
      photo: null
    }
  };

  handleChange = event => {
    this.setState({
      post: {
        ...this.state.post,
        [event.target.id]: event.target.value
      }
    });
  };

  handlePhotoChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  handleDataReset = () => {
    this.setState({
      post: {
        title: "",
        text: ""
      }
    });
  };

  validateTitle = messagesArray => {
    if (
      10 > this.state.post.title.length ||
      this.state.post.title.length > 150
    ) {
      messagesArray.push(
        " Title can contain between 10 and 150 characters. Please do what you should t do!\n "
      );
    }
  };

  validateText = messagesArray => {
    if (this.state.post.text.length > 1000) {
      messagesArray.push(
        "Post's content can contain max 1000 characters. Stop It\n"
      );
    }
  };

  validatePhoto = messagesArray => {
    if (!this.state.selectedFile) {
      messagesArray.push("Every Post must have a photo! ");
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const messagesForUser = [];
    this.validateTitle(messagesForUser);
    this.validateText(messagesForUser);
    this.validatePhoto(messagesForUser);
    if (messagesForUser.length) {
      alert(messagesForUser);
      return;
    }
    let formData = new FormData();
    formData.append("photo", this.state.selectedFile);
    formData.append("post", JSON.stringify(this.state.post));
    this.props.fetchPostToAPI(formData);
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    const { title, text } = this.state.post;

    return (
      <main className={classes.root}>
        <Helmet>
          <title>New Post</title>
          <meta
            name="description"
            content="In this page you can create a new post"
          />
        </Helmet>
        <Card className={classes.content}>
          <div className={classes.toolbar} />
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <CardHeader
              title="New Post"
              subheader="Be Creative!"
              style={{ textAlign: "center", marginTop: "-50px" }}
            />
            <CardContent>
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
                  inputProps={{ maxLength: 150, minLength: 10 }}
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
                <CardActions className={classes.footer}>
                  <Button
                    variant="outlined"
                    aria-label="Save"
                    size="medium"
                    color="primary"
                    autoFocus
                    type="submit"
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
                    id="takePhoto"
                    multiple
                    type="file"
                    onChange={this.handlePhotoChange}
                  />
                  <label htmlFor="takePhoto">
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
              </Grid>
            </CardContent>
          </form>
        </Card>
      </main>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchPostToAPI: formData => dispatch(fetchPostToAPI(formData))
});
export default withRouter(
  connect(
    null,
    mapDispatch
  )(withStyles(styles)(NewPost))
);
