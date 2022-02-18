import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeletePostButton from "./DeletePostButton/index";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./styles";
import EditPostButton from "./EditPostButton";

class Post extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  transformText = (txt) => {
    if (txt.length > 200) {
      return `${txt.slice(0, txt.lastIndexOf(" ", 199)).slice(0, 199)}...`;
    } else {
      return txt;
    }
  };

  transformDate = (publish_date) => {
    const date = new Date(publish_date);
    const DMY = date.toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const HM = date.toLocaleString("default", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${DMY} at ${HM}`;
  };

  render() {
    const {
      classes,
      _id,
      given_name,
      family_name,
      picture,
      title,
      thumbnail,
      text,
      publish_date,
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Post"
              className={classes.avatar}
              src={picture}
            />
          }
          title={title}
          subheader={`${this.transformDate(publish_date)} 
            by ${given_name} ${family_name}`}
        />
        <CardActionArea onClick={this.handleClickOpen} style={{ outline: 0 }}>
          <CardMedia className={classes.media} image={thumbnail} />
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
              {this.transformDate(publish_date)}
            </span>
          </DialogTitle>
          <DialogContent>
            <img src={thumbnail} className={classes.image} alt={title} />
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

        {this.props.posts.filter((post) => post._id === _id).length ? (
          <CardActions className={classes.actions} disableActionSpacing>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <React.Fragment>
                <DeletePostButton delete_id={_id} />
                <EditPostButton delete_id={_id} title={title} text={text} />
              </React.Fragment>
            </Grid>
          </CardActions>
        ) : null}
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
