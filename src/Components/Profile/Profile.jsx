import React from "react";
import ProfileArea from "./ProfileArea";
import classnames from "classnames";
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
  Collapse,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
    }).then(r => console.log(r))
      .then(this.removeUserStorage)
      .then(() => this.props.history.push("/"));
   
  }


  render() {
    
    const { classes } = this.props;
    return (
      <main className={classes.root}>
        <Card className={classes.content}>
          <CardContent>
            <CardMedia
              className={classes.media}
              component="img"
              alt="user photo"
              image={sessionStorage.getItem("avatar")}
            />
            <ProfileArea
              username={sessionStorage.getItem("name")}
              emailAddress={sessionStorage.getItem("email")}
            />
          </CardContent>

          <CardActions>
            <Tooltip title="Edit Profile">
            <IconButton aria-label="Edit profile" color="primary" size="large" component={NavLink} to="/edit_Profile">
              <EditIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Delete Profile"> 
            <IconButton aria-label="Delete profile" color="secondary" size="large" onClick={this.handleClickOpen}>
              <DeleteIcon />
            </IconButton>
            </Tooltip>

            <Tooltip title="About me">
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                An ex-hit-man comes out of retirement to track down the
                gangsters that killed his dog and took everything from him.
              </Typography>
              <Typography paragraph>
                The story focuses on John Wick (Reeves), searching for the men
                who broke into his home, stole his vintage car and killed his
                puppy, which serves as a memento of his recently deceased wife
                (Moynahan). Stahelski and David Leitch directed the film
                together, though only Stahelski was credited.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Account Page"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             After choosing this option you will delete all your profile information. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container
              direction="row"
              justify="space-around"
              alignItems="center" 
               >

            <Button onClick={this.handleClose}  variant="contained" size="medium" color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteProfile}  variant="contained" size="medium" color="secondary">
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