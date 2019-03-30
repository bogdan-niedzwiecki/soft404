import React from "react";
import { NavLink } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class NavItem extends React.Component {
  render() {
    
    return (
      <div>
        <ListItem button key={this.props.title} component={NavLink} to={this.props.to}>
            <ListItemIcon>
              {this.props.children}
            </ListItemIcon>
            <ListItemText primary={this.props.title} />
          </ListItem>
      </div>
    );
  }
}

export default NavItem;
