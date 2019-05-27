const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  list: { listStyleType: "none", marginLeft: "-40px" },
 container: {
  maxHeight: 300,
  overflow: "auto",
  borderRadius:10,
  borderWidth: 1,
  width: 300,
  position: "fixed",
  zIndex: 1,
  top: '13%',
  right: 20,
 },
search: {
  position: "fixed",
  top: '13  %',
}
});

export default styles;
