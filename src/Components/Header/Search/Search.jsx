import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Fab from "@material-ui/core/Fab";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

class Search extends Component {
  onTextChange = (e) => {
    this.props.setHeaderSearch(e.target.value);
    this.props.history.push("/");
  };

  keyPressed = (event) => {
    event.key === "Enter" && this.onButtonClick();
  };

  onButtonClick = () => {
    this.props.searchUser(this.props.headerSearch);
    this.props.setHeaderSearch("");
  };

  handleClickAway = () => {
    this.props.clearUser();
  };

  isFriend = (id) => {
    return this.props.friends.some((friend) => friend._id === id);
  };

  addToFriends = (_id) => {
    this.props.addToFriends(_id);
    this.props.clearUser();
  };

  removeFromFriends = (_id) => {
    this.props.removeFromFriends(_id);
    this.props.clearUser();
  };

  renderSuggestions = () => {
    const { classes, foundUser } = this.props;

    if (!foundUser.length) {
      return null;
    }

    return (
      <div className={classes.container}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div>
            <List className={classes.paper}>
              {foundUser.map((user) => (
                <ListItem key={user._id}>
                  <ListItemAvatar>
                    <Avatar alt={user.given_name} src={user.picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.given_name}
                    secondary={user.family_name}
                  />
                  <ListItemSecondaryAction>
                    {this.isFriend(user._id) ? (
                      <Tooltip
                        title="Remove from friends"
                        aria-label="Remove from friends"
                      >
                        <Fab
                          color="secondary"
                          className={classes.fab}
                          size="small"
                          style={{ marginRight: 10, outline: "none" }}
                          onClick={() => this.removeFromFriends(user._id)}
                        >
                          <PersonAddDisabledIcon />
                        </Fab>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Add to friends"
                        aria-label="Add to friends"
                      >
                        <Fab
                          color="primary"
                          className={classes.fab}
                          size="small"
                          style={{ marginRight: 10, outline: "none" }}
                          onClick={() => this.addToFriends(user._id)}
                        >
                          <PersonAddIcon />
                        </Fab>
                      </Tooltip>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </ClickAwayListener>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          className={classes.rootInput}
          value={this.props.headerSearch}
          onChange={this.onTextChange}
          onKeyPress={this.keyPressed}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{ outline: "none" }}
                  aria-label="Find posts"
                  onClick={this.onButtonClick}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="search-field"
          placeholder="Find users or filter posts"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Search));
