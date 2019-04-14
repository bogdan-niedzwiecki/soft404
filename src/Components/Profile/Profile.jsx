import React from "react";
import ProfileArea from "./ProfileArea";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import styles from "./ProfileStyle";
import {
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Card,
  withStyles,
  Tooltip,
  Collapse,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class Profile extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.root}>
        <Card className={classes.content}>
          <CardContent>
            <CardMedia
              className={classes.media}
              component="img"
              alt="user photo"
              image={sessionStorage.getItem("avatar")}
            />
            <ProfileArea
              username={sessionStorage.getItem("name")}
              emailAddress={sessionStorage.getItem("email")}
              age="example_age"
              phone="example_phone"
            />
          </CardContent>

          <CardActions>
            <IconButton aria-label="Edit profile">
              <EditIcon />
            </IconButton>

            <IconButton aria-label="Delete profile">
              <DeleteIcon />
            </IconButton>

            <Tooltip title="About me">
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                An ex-hit-man comes out of retirement to track down the
                gangsters that killed his dog and took everything from him.
              </Typography>
              <Typography paragraph>
                The story focuses on John Wick (Reeves), searching for the men
                who broke into his home, stole his vintage car and killed his
                puppy, which serves as a memento of his recently deceased wife
                (Moynahan). Stahelski and David Leitch directed the film
                together, though only Stahelski was credited.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </main>
    );
  }
}

export default withStyles(styles)(Profile);
