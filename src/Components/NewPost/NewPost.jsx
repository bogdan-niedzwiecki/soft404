import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./NewPostStyles";
import {
  TextField,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CssBaseline,
  CardContent,
  Button,
  Tooltip,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import { NavLink } from "react-router-dom";


class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.takingTitleChange = this.takingTitleChange.bind(this);
    this.takingTextChange = this.takingTextChange.bind(this);
    this.state = {
      post: {
        title: "",
        text: ""
      },
      openDialog: false
    };
  }

  takingTitleChange(event) {
    this.setState({
      post: { ...this.state.post, title: event.target.value }
    });
  }
  takingTextChange(event) {
    this.setState({
      post: { ...this.state.post, text: event.target.value }
    });
  }
  handleDataReset = () => {
    this.setState(prevState => ({
      post: {
        title: (prevState.title = ""),
        text: (prevState.text = ""),
        selectedFile: ""
      }
    }));
  };

  render() {

    const {
      post: { title, text }
    } = this.state,
    { classes } = this.props;

    return (
 
<Card className={classes.content}>
        <CssBaseline />
        <div className={classes.toolbar} />
        <form className={classes.container} noValidate autoComplete="off">
          <CardHeader
            title=" New Post "
            subheader="Be Creative!"
            style={{ textAlign: "center", marginTop: "-50px" }}
          />
          <CardContent>
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="stretch"
            >
              <TextField
                id="outlined-required"
                label="Title of the Post"
                placeholder="Somewhere in the space"
                margin="normal"
                variant="outlined"
                value={title}
                required={true}
                onChange={this.takingTitleChange}
                erorText="Please enter only 12 digits number"
                inputProps={{ maxLength: 12, minLength: 5 }}
              />

              <TextField
                  id="update"
                  label="Content of the Post"
                  placeholder="It was a monday, day like any other day"
                  rows="10"
                  rowsMax="13"
                  required={true}
                  inputProps={{ maxLength: 1000 }}
                  multiline
                  margin="normal"
                  variant="outlined"
                  value={text}
                  onChange={this.takingTextChange}
               
              />
              <CardActions className={classes.footer}>
              <Tooltip title="SaveME!" placement="bottom-end">
                <Button
                  variant="outlined"
                  aria-label="Save"
                  size="medium"
                  color="primary"
                  onClick={this.handleSubmit}
                  autoFocus
                  component={NavLink}
                  to="/"
                >
                  Save
                  <SaveIcon/>
                </Button>
              </Tooltip>
              <Tooltip title="Cancel" placement="bottom-center">
                <IconButton aria-label="Delete" onClick={this.handleDataReset} color="secondary" size="medium">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <input
                component="span"
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Tooltip title="Upload Photo" placement="bottom-right">
                  <IconButton
                    variant="contained"
                    color="primary"
                    component="span"
                    size="medium"
                  >
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
              </label>
              </CardActions>
            </Grid>
          </CardContent>
        </form>
      </Card>
    );
  }
}
export default withStyles(styles)(NewPost);