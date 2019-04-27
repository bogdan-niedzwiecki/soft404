import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
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

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { post: { title: "", text: "" } };
  }
  handleTitleChange(event) {
    this.setState({ post: { ...this.state.post, title: event.target.value } });
  }
  handleTextChange(event) {
    this.setState({ post: { ...this.state.post, text: event.target.value } });
  }
  handlePhotoChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }
  handleDataReset = () => {
    this.setState({
      post: {
        title: "",
        text: ""
      }
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("photo", this.state.selectedFile);
    formData.append("post", JSON.stringify(this.state.post));
    fetch("https://delfinkitrainingapi.azurewebsites.net/api/post", {
      method: "POST",
      headers: { "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token") },
      body: formData
    })
      .then(response => response.json())
      .then(resp => console.log(resp))
      .then(() => this.props.history.push("/"));
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.root}>
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
                  id="outlined-required"
                  label="Title of the Post"
                  placeholder="Somewhere in the space"
                  margin="normal"
                  variant="outlined"
                  value={this.state.post.title}
                  onChange={this.handleTitleChange}
                  required={true}
                  inputProps={{ maxLength: 150, minLength: 10 }}
                />

                <TextField
                  id="update"
                  label="Content of the Post"
                  placeholder="It was a monday, day like any other day"
                  rows="10"
                  rowsMax="13"
                  required={true}
                  // inputProps={{ maxLength: 1000 }}
                  multiline
                  margin="normal"
                  variant="outlined"
                  value={this.state.post.text}
                  onChange={this.handleTextChange}
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
              </Grid>
            </CardContent>
          </form>
        </Card>
      </main>
    );
  }
}
export default withRouter(withStyles(styles)(NewPost));
