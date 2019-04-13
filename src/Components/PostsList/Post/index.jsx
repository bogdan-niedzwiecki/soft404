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

const styles = () => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: 40
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },

  image: {
    borderRadius: 5,
    width: "100%",
    marginBottom: 20
  },
  date: {
    fontSize: 13,
    color: "grey",
    fontWeight: "normal"
  }
});

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
          <IconButton
            aria-label="Edit post"
            component={NavLink}
            to="/edit_post"
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
