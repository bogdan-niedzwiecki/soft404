import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./NewPostStyles";
import TextField from "@material-ui/core/TextField";
import ButtonsForCreatingPost from "./ButtonsForpostCreating/ButtonsForPostCreating";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import { CardContent } from "@material-ui/core";

class NewPost extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.root}>
        <Card className={classes.content}>
          <div className={classes.toolbar} />
          <form className={classes.container} noValidate autoComplete="off">
            <CardHeader
              title="New Post"
              subheader="Be Creative!"
              style={{ textAlign: "center", marginTop: "-50px" }}
            />
            <CardContent>
              <Grid
                container
                direction="column"
                justify="space-between"
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
                  label="Content of the Post"
                  placeholder="It was a monday, day like any other day"
                  rows="10"
                  rowsMax="13"
                  required={true}
                  inputProps={{ maxLength: 1000 }}
                  multiline
                  margin="normal"
                  variant="outlined"
                />
                <CardActions className={classes.footer}>
                  <ButtonsForCreatingPost />
                </CardActions>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </main>
    );
  }
}

export default withStyles(styles)(NewPost);
