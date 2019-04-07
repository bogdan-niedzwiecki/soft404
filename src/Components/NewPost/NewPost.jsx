import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./NewPostStyles";
import TextField from "@material-ui/core/TextField";
import ButtonsForCreatingPost from "./ButtonsForpostCreating/ButtonsForPostCreating";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CardContent } from "@material-ui/core";

class NewPost extends React.Component {
  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value
  //   });

  // };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.content}>
        <CssBaseline />
        <div className={classes.toolbar} />
        <form className={classes.container} noValidate autoComplete="off">
          <CardHeader
            title=" New Post "
            subheader="Be Creative!"
            style={{ textAlign: "center" }}
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
                required={true}
                erorText="Please enter only 12 digits number"
                inputProps={{ maxLength: 12, minLength: 5 }}
              />

              <TextField
                id="update"
                label="Text"
                placeholder="It was a monday, day like any other day"
                helperText="Just Do IT!!!"
                rows="10"
                rowsMax="13"
                inputProps={{ maxLength: 1000 }}
                multiline
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <CardActions className={classes.footer}>
                <ButtonsForCreatingPost />
              </CardActions>
            </Grid>
          </CardContent>
        </form>
      </Card>
    );
  }
}

export default withStyles(styles)(NewPost);