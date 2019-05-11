import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { NavLink } from "react-router-dom";
import DeletePostButton from "./DeletePostButton/index";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Tooltip } from "@material-ui/core";
import styles from "./styles";

class Post extends React.Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  transformText = txt => {
    if (txt.length > 200) {
      return `${txt.slice(0, txt.lastIndexOf(" ", 199)).slice(0, 199)}...`;
    } else {
      return txt;
    }
  };
  transformDate = date => {
    return date.slice(0, 10) + " at " + date.slice(11, 19);
  };

  render() {
    const {
      classes,
      title,
      thumbnailPhoto,
      text,
      publishDate,
      id,
      userPhoto
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Post"
              className={classes.avatar}
              src={userPhoto}
            />
          }
          title={title}
          subheader={this.transformDate(publishDate)}
        />
        <CardActionArea onClick={this.handleClickOpen} style={{ outline: 0 }}>
          <CardMedia className={classes.media} image={thumbnailPhoto} />
          <CardContent>
            <Typography paragraph className={classes.text}>
              {this.transformText(text)}
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
            {title}
            <br />
            <span className={classes.date}>
              {this.transformDate(publishDate)}
            </span>
          </DialogTitle>
          <DialogContent>
            <img src={thumbnailPhoto} className={classes.image} alt={title} />
            <DialogContentText
              id="alert-dialog-description"
              className={classes.text}
            >
              {text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <CardActions className={classes.actions} disableActionSpacing>
          <DeletePostButton delete_id={id} />
          <IconButton
            aria-label="Edit post"
            component={NavLink}
            to="/edit_Post"
          >
            <Tooltip title="Edit Post">
              <EditIcon color="primary" />
            </Tooltip>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
