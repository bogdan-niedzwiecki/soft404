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
  Icon,
  Tooltip,
  Fab,
  Collapse,
  IconButton,
  Grid
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import avatar from "../Images/Avatar.jpg";

class Profile extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.content}>
        <CardContent>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Nice Photo"
            image={avatar}
            title="Contemplative Reptile"
          />
          <ProfileArea
            username="Morty"
            emailAddress="something@gmai.com"
            age="5"
            phone="73569877"
          />
        </CardContent>

        <CardActions >
          <Grid container justify="space-around" alignItems="baseline">
            <Tooltip title="Edit">
              <Fab color="secondary" aria-label="Edit" component={NavLink} to="/editProfile">
                <Icon>edit_icon</Icon>
              </Fab>
            </Tooltip>
            <Tooltip title="Delete">
              <Fab aria-label="Delete" component={NavLink} to="/">
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </Grid>
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
              An ex-hit-man comes out of retirement to track down the gangsters
              that killed his dog and took everything from him.
            </Typography>
            <Typography paragraph>
              The story focuses on John Wick (Reeves), searching for the men who
              broke into his home, stole his vintage car and killed his puppy,
              which serves as a memento of his recently deceased wife
              (Moynahan). Stahelski and David Leitch directed the film together,
              though only Stahelski was credited.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
