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
  head: {
    display: 'flex',
    width: 140,
   margin: "auto",
  },  
 
  card: {
    width: 400,
    margin: "auto",
    marginBottom: 20,
    flexWrap: 1,
  },

  toolbar: theme.mixins.toolbar,
  container: {
    display: "flex",
    
    },
   
});

export default styles;
