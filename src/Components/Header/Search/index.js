import { connect } from "react-redux";
import Search from "./Search";
import { setHeaderSearch } from "../../actions/postActions";
import { searchUserMiddleware, removeFromFriendsMiddleware, addToFriendsMiddleware, clearUser } from "../../actions/friendActions";

const mapStateToProps = state => {
  return {
    headerSearch: state.headerSearch,
    foundUser: state.foundUser,
    friends: state.user.friends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHeaderSearch: value => dispatch(setHeaderSearch(value)),
    searchUser: name => dispatch(searchUserMiddleware(name)),
    clearUser: () => dispatch(clearUser()),
    addToFriends: _id => dispatch(addToFriendsMiddleware(_id)),
    removeFromFriends: _id => dispatch(removeFromFriendsMiddleware(_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
