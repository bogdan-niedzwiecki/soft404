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
  Grid
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

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeUserStorage = () => {
    sessionStorage.removeItem("azure_access_token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("surname");
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("email");
  };

  handleDeleteProfile(event) {
    event.preventDefault();
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
      method: "DELETE",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    })
      .then(r => console.log(r))
      .then(this.removeUserStorage)
      .then(() => this.props.history.push("/"));
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
            <Typography gutterBottom variant="h5" component="h2">
              {sessionStorage.getItem("name")}
            </Typography>
            <Typography component="p">
              {sessionStorage.getItem("email")}
            </Typography>
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
