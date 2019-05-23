import React, { Component } from "react";
// import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";

import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../PostsList/Post/styles";

class Friend extends Component {
  state = {
    friends: [],
    friendFilter: this.props.filterText
  };

  handleChangeVisibility = () => {};

  handleChange = event => {
    this.setState(
      {
        friendFilter: event.target.value
      },
      () => setTimeout(() => {}, 500)
    );
    fetch(
      `https://delfinkitrainingapi.azurewebsites.net/api/user/${
        this.state.friendFilter
      }`,
      {
        method: "GET",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        }
      }
    ).then(response => response.json());
  };

  render() {
    const { friendFilter } = this.state;
    const { classes, name, giveName, id, photo, show } = this.props;
    return (
      // // <Card className={classes.widget}>
      //   {/* <div className={classes.search}>
      //     <div className={classes.searchIcon} />
      //     <InputBase
      //       placeholder="Search…"
      //       classes={{
      //         root: classes.inputRoot,
      //         input: classes.inputInput
      //       }}
      //       onChange={this.handleChange}
      //       value={filterText}
      //     />
      //   </div> */}
      //   {/* <CardContent>
      //     <List className={classes.root}>
      //       <ListItemAvatar>
      //         <Avatar alt="user photo" src={photo} />
      //       </ListItemAvatar>
      //       <ListItemText
      //         primary="Brunch this weekend?"
      //         secondary={
      //           <React.Fragment>
      //             <Typography component="span" color="textPrimary">
      //               {name}
      //             </Typography>
      //             {giveName}
      //           </React.Fragment>
      //         }
      //       />
      //     </List>
      //   </CardContent> */}
      // {/* </Card> */}

      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Post" className={classes.avatar} src={photo} />
          }
          title={name}
        />
        <CardActionArea onClick={this.handleClickOpen} style={{ outline: 0 }}>
          <CardMedia className={classes.media} image={photo} />
          <CardContent>
            <Typography paragraph className={classes.text}>
              {name}
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
            {giveName}
            <br />
          </DialogTitle>
          <DialogContent>
            <img src={photo} className={classes.image} alt={name} />
            <DialogContentText
              id="alert-dialog-description"
              className={classes.text}
            >
              {giveName}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <CardActions className={classes.actions} disableActionSpacing>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          />
        </CardActions>
      </Card>
    );
  }
}
export default withStyles(styles)(Friend);
