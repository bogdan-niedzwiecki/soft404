const styles = theme => ({
  body: {
    display: "flex"

  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    maxwith: 600,
    margin: "auto",
    
    padding: theme.spacing.unit * 10,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 240
    }
  },
});
export default styles;