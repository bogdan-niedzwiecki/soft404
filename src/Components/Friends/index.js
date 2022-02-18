import { connect } from "react-redux";
import Friends from "./Friends.jsx";
import { setAsideSearch, removeFromFriendsMiddleware, toggleVisibilityMiddleware } from "../actions/friendActions";

const mapDispatchToProps = dispatch => {
  return {
    setAsideSearch: (text) => dispatch(setAsideSearch(text)),
    removeFromFriends: (friend_id) =>
      dispatch(removeFromFriendsMiddleware(friend_id)),
    toggleVisibility: (friend_id, show) => dispatch(toggleVisibilityMiddleware(friend_id, show)),
  };
};

export default connect(null, mapDispatchToProps)(Friends);

