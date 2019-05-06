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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
  }

  state = {
    open: false,
    expanded: false,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false
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
    const { checkbox1, checkbox2, checkbox3 } = this.state;

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
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkbox1}
                    onChange={this.handleChange("checkbox1")}
                    value="checkbox1"
                  />
                }
                label="My choise"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkbox2}
                    onChange={this.handleChange("checkbox2")}
                    value="checkbox2"
                  />
                }
                label="2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkbox3}
                    onChange={this.handleChange("checkbox3")}
                    value="checkbox3"
                  />
                }
                label="OK"
              />
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
                    this.state.checkbox1 &&
                    this.state.checkbox2 &&
                    this.state.checkbox3
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
