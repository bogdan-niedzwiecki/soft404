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
  TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { withRouter } from "react-router";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    // this.handleNameChange = this.handleNameChange.bind(this);
    // this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
  }

  state = {
    user: {
      name: sessionStorage.getItem("name"),
      lastName: sessionStorage.getItem("surname"),
      email: sessionStorage.getItem("email"),
      photo: null
    }
  };

  // handleNameChange(event) {
  //   this.setState({
  //     user: { ...this.state.user, name: event.target.value }
  //   });
  // }
  // handleSurnameChange(event) {
  //   this.setState({
  //     user: { ...this.state.user, surname: event.target.value }
  //   });
  // }

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

  handleEditProfile(event) {
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
      .then(() => this.props.history.push("/profile"));
  }

  render() {
    const { classes } = this.props;
    // const { name, surname, email } = this.props.user;

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
              value={this.state.user.name}
            />
            <TextField
              id="lastName"
              label="Last Name"
              onChange={this.handleChange}
              margin="normal"
              multiline
              variant="outlined"
              value={this.state.user.surname}
            />

            <TextField
              id="email"
              label="E-mail"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              value={this.state.user.email}
            />
          </CardContent>
          <CardActions>
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
            <Tooltip title="Delete Profile">
              <IconButton
                aria-label="Delete profile"
                color="secondary"
                size="large"
                onClick={this.handleEditProfile}
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
              <Tooltip title="Upload Avatar" placement="bottom">
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
        </Card>
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(EditProfile));
