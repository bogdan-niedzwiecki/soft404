const styles = theme => ({
  root: {
    width: "50%",
    margin: "auto",
    position: "fixed"
  },
  rootInput: {
    width: "100%"
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    maxHeight: 250,
    overflow: "auto",
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
    left: 0,
    right: 0,
    boxShadow: "0px 1px 5px -2px black",
    borderRadius: "3px"
  },
  button: {
    marginRight: 10
  }
});

export default styles;
