import React, { Component } from "react";
import styles from "./styles";
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
  ListItemText,
  Dialog,
  DialogContent,
  DialogTitle,
  Button
} from "@material-ui/core";

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

  handleDelete = () => {
    fetch(
      `https://delfinkitrainingapi.azurewebsites.net/api/user/${this.props.id}`,
      {
        method: "DELETE",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        }
      }
    ).then(response => console.log(response));
  };
  handleShow = () => {
    fetch(
      `https://delfinkitrainingapi.azurewebsites.net/api/friend/${
        this.props.id
      }`,
      {
        method: "PUT",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        }
      }
    ).then(response => console.log(response));
  };

  render() {
    const { friendFilter } = this.state;
    const { classes, name, giveName, id, photo, show } = this.props;
    return (
      <Card className={classes.widget}>
        {/* <div className={classes.search}>
          <div className={classes.searchIcon} />
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={this.handleChange}
            value={friendFilter}
          />
        </div> */}
        <CardContent>
          <List className={classes.root}>
            <ListItemAvatar>
              <Avatar alt="user photo" src={photo} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography component="span" color="textPrimary">
                  {name}
                </Typography>
              }
            />
          </List>
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={this.handleDelete}>
            Delete
          </Button>
          <Button color="primary" onClick={this.handleShow}>
            Show
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default withStyles(styles)(Friend);
