const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  list: { listStyleType: "none", marginLeft: "-40px" },

 container: {
  maxHeight: 350,
  overflow: "auto",
  borderRadius:5,
  borderWidth: 1,
  width: 350,
  position: "fixed",
  zIndex: 1,
  top: '13%',
  right: 20,
 },

search: {
  position: "fixed",
  top: '13  %',
},

rootInput: {
  width: 300
},
});

export default styles;
