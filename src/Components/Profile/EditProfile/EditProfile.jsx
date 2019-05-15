import React, { Component } from "react";
import styles from "../styles";
import {
  CardContent,
  CardMedia,
  CardActions,
  Card,
  withStyles,
  Tooltip,
  IconButton,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { withRouter, NavLink } from "react-router-dom";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Helmet } from "react-helmet";

class EditProfile extends Component {
  state = {
    user: {
      name: this.props.user.Name,
      givenName: this.props.user.GivenName
    }
  };

  handleChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.id]: event.target.value
      }
    });
  };
  handlePhotoChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleEditProfile = () => {
    let formData = new FormData();
    if (this.state.selectedFile) {
      formData.append("photo", this.state.selectedFile);
    }
    formData.append("user", JSON.stringify(this.state.user));
    this.props.editProfile(formData);
    this.props.history.push("/profile");
  };

  render() {
    const { classes } = this.props;
    const { name, givenName } = this.state.user;

    return (
      <main className={classes.root}>
        <Helmet>
          <title>Edit Profile Page</title>
          <meta name="description" content="Editing a profile page" />
        </Helmet>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.user.Photo}
            title={name}
          />
          <CardContent>
            <TextField
              id="name"
              label="Name"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              value={name}
              fullWidth
            />
            <TextField
              id="givenName"
              label="Last Name"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              value={givenName}
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Tooltip title="Save Changes">
                <IconButton
                  aria-label="Save Change"
                  color="primary"
                  size="large"
                  onClick={this.handleEditProfile}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel Change">
                <Button
                  color="primary"
                  variant="outlined"
                  component={NavLink}
                  to="/profile"
                >
                  Cancel
                </Button>
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
                <Tooltip title="Upload Avatar">
                  <IconButton color="primary" component="span" size="medium">
                    <PhotoCameraIcon />
                  </IconButton>
                </Tooltip>
              </label>
            </Grid>
          </CardActions>
        </Card>
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(EditProfile));
