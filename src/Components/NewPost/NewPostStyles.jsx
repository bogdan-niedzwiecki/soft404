const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 240
    }
  },

  toolbar: theme.mixins.toolbar,
  container: {
    display: "flex",
    flexWrap: 1,
    maxwith: 400,
    margin: "auto"
  }
});

export default styles;
