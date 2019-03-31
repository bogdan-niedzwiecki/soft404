const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    marginTop: 30,
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  head: {
    display: "flex",
    width: 140,
    margin: "auto"
  },

  card: {
    width: 600,
    margin: "auto",
    marginBottom: 20,
    flexWrap: 1
  },

  toolbar: theme.mixins.toolbar,
  container: {
    display: "flex"
  }
});

export default styles;
