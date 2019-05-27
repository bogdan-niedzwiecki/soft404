import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  // container: {
  //   // maxWidth: 300,
  //   // padding: `0 ${theme.spacing.unit * 7}px`,
  //   // margin: "auto",
  // },
  media: {
    height: 150,
    width: 150,
    margin: "auto",
    marginTop: 40,
    marginBottom: 20,
    borderRadius: "50%"
  },

  search: {
    position: "fixed",
    left: "1%",
    borderRadius: 15,
    backgroundColor: fade(theme.palette.common.white, 0.9),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.06)
    },
    marginRight: theme.spacing.unit * 0.2,
    marginLeft: theme.spacing.unit * 0.1,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit * 2,
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "inline-block",
      width: "40%"
    }
  },
  // searchIcon: {
  //   width: theme.spacing.unit * 0.01,
  //   height: "80%",
  //   position: "absolute",
  //   display: "flex",
  //   justifyContent: "center"
  // },
  inputRoot: {
    color: "secondary"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 1,
    transition: theme.transitions.create("width"),
    width: "30%",
    [theme.breakpoints.up("sm")]: {
      width: "20%"
    }
  }
});

export default styles;
