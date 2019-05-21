import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Typography,
  Card,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";

class Friend extends Component {
  state = {
    friends: [
      {
        Name: "",
        giveName: "pop"
      }
    ],
    filterText: this.props.filterText
  };

  handleChangeVisibility = () => {};

  handleChange = event => {
    this.setState(
      {
        filterText: event.target.value
      },
      () => setTimeout(() => {}, 500)
    );
    fetch(
      `https://delfinkitrainingapi.azurewebsites.net/api/user/${
        this.state.filterText
      }`,
      {
        method: "GET",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        }
      }
    )
      .then(response => response.json())
      .then(() => console.log("my data " + this.state.friends.Friend));
  };

  render() {
    const { filterText } = this.state;
    const { classes, name, giveName, photo, show, id } = this.props;
    return (
      <Card className={classes.widget}>
        {/* {friends.map(item => (
          <li key={item.Id}>
            name={Name}
            id={item.Id}
            giveName={item.Title}
            thumbnailPhoto={item.ThumbnailPhoto}
            text={item.Text}
            publishDate={item.PublishDate}
          </li>
        ))} */}
        <div className={classes.search}>
          <div className={classes.searchIcon} />
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={this.handleChange}
            value={filterText}
          />
        </div>
        <CardContent>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="user photo" src={this.props} />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography component="span" color="textPrimary">
                      {"name"}
                    </Typography>
                    {" some info?"}
                  </React.Fragment>
                }
              />
            </ListItem>

            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="user photo" src={this.props.Name} />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography component="span" color="textPrimary">
                      name
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(Friend);
