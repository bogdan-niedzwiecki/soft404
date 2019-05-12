import React from "react";
import styles from "../ProfileStyle";
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




class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
  }

  state = {
    user: {
      name: sessionStorage.getItem("name"),
      givenname: sessionStorage.getItem("surname"),
      email: sessionStorage.getItem("email"),
      photo: null
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
  handlePhotoChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  handleEditProfile() {
    let formData = new FormData();
    if (this.state.selectedFile) {
      formData.append("photo", this.state.selectedFile);
    }

    formData.append("user", JSON.stringify(this.state.user));
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
      method: "PUT",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      },
      body: formData
    })
      .then(r => console.log(r))
      .then(() => this.props.history.push("/profile"))
  }

  render() {
    const { classes } = this.props;
    const { name, givenname, email } = this.state.user;

    return (
      <main className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={sessionStorage.getItem("avatar")}
            title={sessionStorage.getItem("name")}
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
              id="givenname"
              label="Last Name"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              value={givenname}
              fullWidth
            />

            <TextField
              id="email"
              label="E-mail"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              value={email}
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
