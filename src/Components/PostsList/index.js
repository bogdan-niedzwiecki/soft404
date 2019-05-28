import { connect } from "react-redux";
import PostsList from "./PostsList";
import { getMyPostsMiddleware } from "../actions/postActions";
import {friendsfilter} from "../actions/friendActions";

const mapStateToProps = state => {
  return {
    posts: state.allPosts
      .sort((a, b) => (a.PublishDate > b.PublishDate ? -1 : 1))
      .filter(
        post =>
          post.Title.toLowerCase().includes(state.mainSearch.toLowerCase()) ||
          post.Text.toLowerCase().includes(state.mainSearch.toLowerCase())
      ),
    userPhoto: state.me.Friend.Photo,
    friends: state.friends,
    allPosts: state.allPosts,
    // friends: state.friends.filter(
    //   item =>
    //     item.Friend.Name.includes(state.filterText) ||
    //     item.Friend.GivenName.includes(state.filterText)
    // ),
    filterText: state.filterText,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPosts: () => dispatch(getMyPostsMiddleware()),
    friendsfilter: text => dispatch(friendsfilter(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
