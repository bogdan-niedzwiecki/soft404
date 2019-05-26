import React from "react";
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

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { suggestions: [], text: "", open: false };
  }

  onTextChange = e => {
    const value = e.target.value;
    this.setState({ text: value }, () =>
      setTimeout(() => {
        this.props.setMainSearch(value);
      }, 500)
    );
    this.props.history.push("/");
  };

  keyPressed = event => {
    if (event.key === "Enter") {
      this.onButtonClick();
    }
  };

  onButtonClick = () => {
    this.props.findFriends(this.state.text);
    if (this.state.text.length > 0) {
      setTimeout(() => {
        this.setState({ suggestions: this.props.foundFriends, open: true });
      }, 500);
    }
  };

  suggestionSelected = value => {
    this.setState({ text: value, suggestions: [] });
  };

  handleClickAway = () => {
    this.setState({ open: false });
  };

  isFriend = id => {
    return this.props.friends.some(item => item.Friend.Id === id);
  };

  renderSuggestions = () => {
    const { classes } = this.props;
    const { suggestions, open } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className={classes.container}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div>
            {open ? (
              <List dense className={classes.paper}>
                {suggestions.map(item => (
                  <ListItem key={item.Id}>
                    <ListItemAvatar>
                      <Avatar alt={item.Name} src={item.Photo} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.Name}
                      secondary={item.GivenName}
                    />
                    <ListItemSecondaryAction>
                      {this.isFriend(item.Id) ? (
                        <Tooltip
                          title="Remove from friends"
                          aria-label="Remove from friends"
                        >
                          <Fab
                            color="secondary"
                            className={classes.fab}
                            size="small"
                            style={{ marginRight: 10, outline: "none" }}
                            onClick={() =>
                              this.props.removeFromFriends(item.Id)
                            }
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
                            onClick={() => this.props.addToFriends(item.Id)}
                          >
                            <PersonAddIcon />
                          </Fab>
                        </Tooltip>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    );
  };

  render() {
    const { text } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          className={classes.rootInput}
          value={text}
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
            )
          }}
          id="search-field"
          placeholder="Find your friends or filter posts"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(Search));
