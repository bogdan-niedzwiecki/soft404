import { connect } from "react-redux";
import Search from "./Search";
import { filterPosts } from "../../actions/postActions";

const mapStateToProps = state => {
  return {
    filterText: state.filterText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterPosts: text => dispatch(filterPosts(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
