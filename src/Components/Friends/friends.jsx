import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItem,
  Avatar,
  ListItemText,
  Grid,
  CardMedia,
  Tooltip,
  IconButton,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class Friends extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.removeFromFriends(this.props.friend_id);
    this.props.history.push("/");
  };

  handleShow = () => {
    this.props.toggleVisibility(this.props.friend_id);
    this.props.history.push("/");
  };

  handleHide = () => {
    this.props.toggleVisibility(this.props.friend_id, this.props.show);
    this.props.history.push("/");
  };

  render() {
    const { classes, name, givenName, photo, show } = this.props;

    return (
      <List className={classes.container}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <ListItem button onClick={this.handleClickOpen}>
            <ListItemAvatar>
              <Avatar alt="user photo" src={photo} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography component="span" color="textPrimary">
                  {name} {givenName}
                </Typography>
              }
            />
          </ListItem>
          <ListItemSecondaryAction>
            <Tooltip title="Delete Friend">
              <IconButton
                color="secondary"
                size="small"
                onClick={this.handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            {show ? (
              <Tooltip title="Hide posts">
                <IconButton
                  aria-label="Hide"
                  size="small"
                  color="secondary"
                  onClick={this.handleHide}
                >
                  <VisibilityOffIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Show posts">
                <IconButton
                  aria-label="Show"
                  size="small"
                  color="primary"
                  onClick={this.handleShow}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            )}
          </ListItemSecondaryAction>
        </Grid>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{ textAlign: "center", marginTop: "3%" }}>
            {"Personal information"}
          </DialogTitle>
          <DialogContent>
            <CardMedia className={classes.media} image={photo} titile={name} />
            <Typography gutterBottom variant="h5" component="h2">
              {`${name} ${givenName}`}
            </Typography>
          </DialogContent>
        </Dialog>
      </List>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Friends);
