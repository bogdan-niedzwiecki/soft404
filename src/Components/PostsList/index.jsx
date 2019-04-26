import React from "react";
import Post from "./Post/";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  list: { listStyleType: "none" }
});

class PostsList extends React.Component {
  state = { postsList: [] };

  componentDidMount() {
    fetch("https://delfinkitrainingapi.azurewebsites.net/api/post", {
      method: "GET",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    })
      .then(response => response.json())
      .then(resp =>
        this.setState({
          postsList: resp.sort((a, b) =>
            a.PublishDate > b.PublishDate ? -1 : 1
          )
        })
      )
      .then(() => console.log(this.state.postsList));
  }

  render() {
    const { classes } = this.props;

    const arrList = this.state.postsList.map(item => {
      return (
        <li key={item.Id}>
          <Post
            id={item.Id}
            title={item.Title}
            thumbnailPhoto={item.ThumbnailPhoto}
            text={item.Text}
            publishDate={item.PublishDate}
          />
        </li>
      );
    });

    return (
      <main className={classes.root}>
        <ul className={classes.list}>{arrList}</ul>
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
