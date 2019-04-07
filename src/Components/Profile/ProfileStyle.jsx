const styles = theme => ({
  content: {
    maxWidth: 600,
    marginTop: "5%",
    margin: "auto",
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  media: {
    height: "20",
    paddingBottom: '5%'
   
  },

  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
 

});

export default styles;
