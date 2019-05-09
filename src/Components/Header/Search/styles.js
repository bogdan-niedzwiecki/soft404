import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  search: {
    position: "relative",
    left: "7%",
    borderRadius: 16,
    backgroundColor: fade(theme.palette.common.white, 0.9),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.06)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit * 2,
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "inline-block",
      width: "40%"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "primary",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%"
    }
  }
});
export default styles;
