import React, { Component } from "react";
import Friend from "./friends";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {InputBase} from "@material-ui/core";

class FriendsList extends Component {
  state = {
    
    friendsfilter: this.props.friendsfilter
  };

  handleChange = event => {
    this.props.history.push("/");
    this.setState(
      {
        friendsfilter: event.target.value
      },
      () =>
        setTimeout(() => {
          this.props.friendsfilter(this.state.friendsfilter);
        }, 500)
    );
  };

  // componentDidMount() {
  //   this.props.getFriends();
  // }

  render() {
    const { classes, friends  } = this.props;
    const { friendsfilter } = this.state;
    return (
      <div>   
           <div className={classes.search}>
          <div className={classes.searchIcon} />
          <InputBase
            placeholder="Search…"
            classes={{  
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={this.handleChange}
            value={friendsfilter}
          />
        </div>

      
      </div>   
    );
  }
}



export default  withRouter(withStyles(styles)(FriendsList));