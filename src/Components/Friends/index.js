import { connect } from "react-redux";
import FriendsList from "./FriendsList";
import { getFriendsMiddleware } from "../actions/friendsAction";

const mapStateToProps = state => {
  return {

    friends: state.friends

  };
};



const mapDispatchToProps = dispatch => {
  return {
    getFriends: () => dispatch(getFriendsMiddleware()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);
