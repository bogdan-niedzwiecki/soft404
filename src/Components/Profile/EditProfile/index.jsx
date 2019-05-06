import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../ProfileStyle";
import {
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Card,
  withStyles,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
  }

  state = {
    open: false,
    expanded: false
  };



  handleChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.id]: event.target.value
      }
    });
  };
  handleClickUpdateProfile = () => {
    this.props.editProfile(this.state.user);
    this.props.history.push("/profilePage");
  };

  handleDeleteProfile(event) {
    let formData = new FormData();

    if (this.state.selectedFile) {
    formData.append('photo', this.state.selectedFile);
    }
    formData.append('user', JSON.stringify(this.state.user));
    fetch(
    `https://delfinkitrainingapi.azurewebsites.net/api/user`,
    {
    method: 'PUT',
    headers: {
    'X-ZUMO-AUTH': this.props.authToken
    },
    body: formData
    }
    ).then(r => console.log(r)); 
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={sessionStorage.getItem("avatar")}
            title={sessionStorage.getItem("name")}
          />
          <CardContent>
          <form  noValidate autoComplete="off">
            <TextField id="name"
              label="Name"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              value={sessionStorage.getItem("name")}
            />

            <TextField
              id="lastName"
              label="Last Name"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              value={sessionStorage.getItem("surname")}
            />  

            <TextField id="email"
              label="E-mail"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              value={sessionStorage.getItem("email")}
            />
           </form>
         
          </CardContent>
          <CardActions>
            <Tooltip title="Edit Profile">
              <IconButton
                aria-label="Edit profile"
                color="primary"
                size="large"
                component={NavLink}
                to="/edit_profile"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Profile">
              <IconButton
                aria-label="Delete profile"
                color="secondary"
                size="large"
                onClick={this.handleClickOpen}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Account Page"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              After choosing this option you will delete all your profile
              information.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Button
                onClick={this.handleClose}
                variant="contained"
                size="medium"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleDeleteProfile}
                variant="contained"
                size="medium"
                color="secondary"
              >
                Delete
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(Profile));
