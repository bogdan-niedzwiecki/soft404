import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  CardActionArea,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { NavLink } from "react-router-dom";
import DeletePostButton from "./DeletePostButton/index";
import styles from "./PostStyles";

class Post extends React.Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Post"
              className={classes.avatar}
              src={sessionStorage.getItem("avatar")}
            />
          }
          title={this.props.title}
          subheader={this.props.date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        />
        <CardActionArea onClick={this.handleClickOpen} style={{ outline: 0 }}>
          <CardMedia
            className={classes.media}
            image={this.props.img}
            title={this.props.altImg}
          />
          <CardContent>
            <Typography paragraph>
              {this.props.content.slice(
                0,
                this.props.content.lastIndexOf(" ", 200)
              )}
              ...
            </Typography>
          </CardContent>
        </CardActionArea>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.props.title}
            <br />
            <span className={classes.date}>
              {this.props.date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <img src={this.props.img} className={classes.image} alt="" />
              {this.props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <CardActions className={classes.actions} disableActionSpacing>
          <DeletePostButton />
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit post"
              component={NavLink}
              to="/edit_post"
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
