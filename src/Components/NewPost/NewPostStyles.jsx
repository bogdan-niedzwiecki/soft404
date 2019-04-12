const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  content: {
    maxWidth: 600,
    margin: "auto"
  },
  container: {
    paddingTop: -200
  },
  toolbar: theme.mixins.toolbar
});

export default styles;
