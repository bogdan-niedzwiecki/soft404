import { connect } from "react-redux";
import Search from "./Search";
import { setMainSearch } from "../../actions/postActions";
import { findFriendsMiddleware } from "../../actions/friendActions";
import { addToFriendsMiddleware } from "../../actions/friendActions";
import { removeFromFriendsMiddleware } from "../../actions/friendActions";

const mapStateToProps = state => {
  return {
    mainSearch: state.mainSearch,
    foundFriends: state.foundFriends,
    friends: state.friends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMainSearch: text => dispatch(setMainSearch(text)),
    findFriends: name => dispatch(findFriendsMiddleware(name)),
    addToFriends: id => dispatch(addToFriendsMiddleware(id)),
    removeFromFriends: id => dispatch(removeFromFriendsMiddleware(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
