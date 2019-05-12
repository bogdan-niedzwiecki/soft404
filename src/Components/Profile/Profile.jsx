import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProfileStyle";
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
  Checkbox,
  FormGroup,
  FormControlLabel
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { deleteUserFromApi } from "../actions/userActions";


class Profile extends React.Component {
  state = {
    open: false,
    expanded: false,
    choose1: false,
    choose2: false,
    choose3: false
  };

  handleDeleteProfile = event => {
    event.preventDefault();
    this.props.deleteUserFromApi(this.props.token);
    this.removeUserStorage();
    this.props.history.push("/");
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  removeUserStorage = () => {
    sessionStorage.removeItem("azure_access_token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("surname");
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("email");
  };

  render() {
    const { classes } = this.props;
    const { choose1, choose2, choose3 } = this.state;

    return (
      <main className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={sessionStorage.getItem("avatar")}
            title={sessionStorage.getItem("name")}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {sessionStorage.getItem("name") +
                " " +
                sessionStorage.getItem("surname")}
            </Typography>
            <Typography component="p">
              {sessionStorage.getItem("email")}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
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
            </Grid>
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
            <FormGroup>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="baseline"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={choose1}
                      onChange={this.handleChange("choose1")}
                      value="choose1"
                    />
                  }
                  label="I Am sure "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={choose2}
                      onChange={this.handleChange("choose2")}
                      value="choose2"
                    />
                  }
                  label="Agree with delete my profile"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={choose3}
                      onChange={this.handleChange("choose3")}
                      value="choose3"
                    />
                  }
                  label="Finaly! Just Do It!"
                />
              </Grid>
            </FormGroup>
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
                disabled={
                  !(
                    this.state.choose1 &&
                    this.state.choose2 &&
                    this.state.choose3
                  )
                }
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
const mapDispatch = dispatch => ({
  deleteUserFromApi: token => dispatch(deleteUserFromApi(token))
});

const mapState = state => ({
  token: state.token
});
export default withRouter(connect(
  mapState,
  mapDispatch
)(withStyles(styles, {withTheme: true})(Profile)));
