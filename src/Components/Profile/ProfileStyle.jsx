const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  content: {
    maxWidth: 600,
    margin: "auto",
    flexGrow: 1,
  },
  media: {
    width: 120,
    margin: "auto",
    marginBottom: 35,
    borderRadius: "50%"
  },

  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

export default styles;
