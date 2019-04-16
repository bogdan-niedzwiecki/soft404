import React from "react";
import Post from "./Post/index";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 3}px`
  }
});

class PostsList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.root}>
        <Post
          title="1Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          content="Nullam tincidunt metus tincidunt, dignissim nibh non,
            tincidunt turpis. Duis sit amet ex est. Aenean quis pellentesque arcu.
            Sed luctus nisl ut leo ullamcorper molestie. Nunc fermentum pretium neque,
            a vehicula mi interdum quis. Nunc est lacus, posuere ut velit in, porta vestibulum arcu.
            Suspendisse rhoncus metus neque, id rutrum nisl ultrices vitae.
            Pellentesque quis lorem nec mi dapibus tristique. Morbi sit amet sem fermentum,
            posuere lorem at, ullamcorper metus. Phasellus varius eget metus eu gravida. 
            Integer imperdiet nisi at justo maximus egestas. Proin sit amet posuere leo, 
            id fermentum purus. Aenean ullamcorper est arcu, ac euismod odio suscipit sed. 
            Integer diam dui, egestas eu ligula ut, feugiat rhoncus nulla.
            Sed vel nulla in nulla gravida semper.Nullam tincidunt metus tincidunt, dignissim nibh non,
            tincidunt turpis. Duis sit amet ex est. Aenean quis pellentesque arcu.
            Sed luctus nisl ut leo ullamcorper molestie. Nunc fermentum pretium neque,
            a vehicula mi interdum quis. Nunc est lacus, posuere ut velit in, porta vestibulum arcu.
            Suspendisse rhoncus metus neque, id rutrum nisl ultrices vitae.
            Pellentesque quis lorem nec mi dapibus tristique. Morbi sit amet sem fermentum,
            posuere lorem at, ullamcorper metus. Phasellus varius eget metus eu gravida. 
            Integer imperdiet nisi at justo maximus egestas. Proin sit amet posuere leo, 
            id fermentum purus. Aenean ullamcorper est arcu, ac euismod odio suscipit sed. 
            Integer diam dui, egestas eu ligula ut, feugiat rhoncus nulla.
            Sed vel nulla in nulla gravida semper.Nullam tincidunt metus tincidunt, dignissim nibh non,
            tincidunt turpis. Duis sit amet ex est. Aenean quis pellentesque arcu.
            Sed luctus nisl ut leo ullamcorper molestie. Nunc fermentum pretium neque,
            a vehicula mi interdum quis. Nunc est lacus, posuere ut velit in, porta vestibulum arcu.
            Suspendisse rhoncus metus neque, id rutrum nisl ultrices vitae.
            Pellentesque quis lorem nec mi dapibus tristique. Morbi sit amet sem fermentum,
            posuere lorem at, ullamcorper metus. Phasellus varius eget metus eu gravida. 
            Integer imperdiet nisi at justo maximus egestas. Proin sit amet posuere leo, 
            id fermentum purus. Aenean ullamcorper est arcu, ac euismod odio suscipit sed. 
            Integer diam dui, egestas eu ligula ut, feugiat rhoncus nulla.
            Sed vel nulla in nulla gravida semper."
          img="https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/paella_7100_16x9.jpg"
          altImg="alternative image text 1"
          date={new Date()}
        />
        <Post
          title="2Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          content="Nullam tincidunt metus tincidunt, dignissim nibh non,
            tincidunt turpis. Duis sit amet ex est. Aenean quis pellentesque arcu.
            Sed luctus nisl ut leo ullamcorper molestie. Nunc fermentum pretium neque,
            a vehicula mi interdum quis. Nunc est lacus, posuere ut velit in, porta vestibulum arcu.
            Suspendisse rhoncus metus neque, id rutrum nisl ultrices vitae.
            Pellentesque quis lorem nec mi dapibus tristique. Morbi sit amet sem fermentum,
            posuere lorem at, ullamcorper metus. Phasellus varius eget metus eu gravida. 
            Integer imperdiet nisi at justo maximus egestas. Proin sit amet posuere leo, 
            id fermentum purus. Aenean ullamcorper est arcu, ac euismod odio suscipit sed. 
            Integer diam dui, egestas eu ligula ut, feugiat rhoncus nulla.
            Sed vel nulla in nulla gravida semper."
          img="https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/paella_7100_16x9.jpg"
          altImg="alternative image text 1"
          date={new Date()}
        />
        <Post
          title="3Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          content="Nullam tincidunt metus tincidunt, dignissim nibh non,
            tincidunt turpis. Duis sit amet ex est. Aenean quis pellentesque arcu.
            Sed luctus nisl ut leo ullamcorper molestie. Nunc fermentum pretium neque,
            a vehicula mi interdum quis. Nunc est lacus, posuere ut velit in, porta vestibulum arcu.
            Suspendisse rhoncus metus neque, id rutrum nisl ultrices vitae.
            Pellentesque quis lorem nec mi dapibus tristique. Morbi sit amet sem fermentum,
            posuere lorem at, ullamcorper metus. Phasellus varius eget metus eu gravida. 
            Integer imperdiet nisi at justo maximus egestas. Proin sit amet posuere leo, 
            id fermentum purus. Aenean ullamcorper est arcu, ac euismod odio suscipit sed. 
            Integer diam dui, egestas eu ligula ut, feugiat rhoncus nulla.
            Sed vel nulla in nulla gravida semper."
          img="https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/paella_7100_16x9.jpg"
          altImg="alternative image text 1"
          date={new Date()}
        />
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PostsList);
