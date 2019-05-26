const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  list: { listStyleType: "none", marginLeft: "-40px" },
 container: {
  maxWidth: 300,
  // display: "flex",
  position: "fixed",
  zIndex: 1,
  top: '13%',
  right: 20
 }
});

export default styles;
