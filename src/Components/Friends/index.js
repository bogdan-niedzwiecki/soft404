import { connect } from "react-redux";
import Friend from "./friends";




const mapDispatchToProps = dispatch => {
  return {
    getFriends: () => dispatch(getFriendsMiddleware()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friend);
