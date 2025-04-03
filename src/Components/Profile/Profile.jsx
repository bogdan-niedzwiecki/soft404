import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles";
import { withRouter } from "react-router";
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
  FormControlLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Helmet } from "react-helmet";

class Profile extends Component {
  state = {
    open: false,
    choose1: false,
    choose2: false,
    choose3: false,
  };

  handleDeleteProfile = () => {
    this.props.deleteUser();
    localStorage.removeItem("token_id");
    this.props.history.push("/login");
    window.location.reload(false);
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, user } = this.props;
    const { choose1, choose2, choose3 } = this.state;
    return (
      <main className={classes.root}>
        <Helmet>
          <title>Profile Page</title>
          <meta
            name="description"
            content="In this page you will find a Profile information"
          />
        </Helmet>
        <Card className={classes.card}>
          {user.picture && user.given_name && (
            <CardMedia
              className={classes.media}
              image={user.picture}
              title={user.given_name}
            />
          )}
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {`${user.given_name} ${user.family_name}`}
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
                  onClick={this.handleClick}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClick}
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
                onClick={this.handleClick}
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
export default withRouter(withStyles(styles, { withTheme: true })(Profile));
