import React, { PropTypes } from "react";
import ProfileArea from "./ProfileArea";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ProfileStyle";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Fab from "@material-ui/core/Fab";
import { CardContent } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

class Profile extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.content}>
        <CardHeader
          avatar="404"
          title={(this.username = "Bred Pitt")}
          subheader="My man!"
        />
        <CardContent>
          <ProfileArea
            emailAddress="peter@whatever.com"
            age="24"
            phone="54545432"
          />
        </CardContent>
        <CardActions>
          <Tooltip title="Edit">
            <Fab color="secondary" aria-label="Edit">
              <Icon>edit_icon</Icon>
            </Fab>
          </Tooltip>
          <Tooltip title="Delete">
            <Fab aria-label="Delete">
              <DeleteIcon />
            </Fab>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
