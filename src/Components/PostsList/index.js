import { connect } from "react-redux";
import PostsList from "./PostsList";
import { getFriendsMiddleware, setAsideSearch } from "../actions/friendActions";

const mapStateToProps = state => {

  function getFriendPosts() {
    if (!state.user.friends) { return [] }

    return state.user.friends.filter(friend => friend.visible).map(friend => {
      const { family_name, given_name, picture } = friend;
      return friend.posts?.map(post => {
        return { ...post, family_name, given_name, picture }
      })
    })
  }

  const friendPosts = [].concat(...getFriendPosts());

  const userPosts = state.user.posts.map(post => {
    const { family_name, given_name, picture } = state.user;
    return { ...post, family_name, given_name, picture }
  })

  return {
    posts: [...userPosts, ...friendPosts]
      .filter(post =>
        post?.family_name?.includes(state.headerSearch) ||
        post?.given_name?.includes(state.headerSearch) ||
        post?.title?.includes(state.headerSearch) ||
        post?.text?.includes(state.headerSearch)
      )
      .sort((a, b) => {
        return new Date(b.publish_date) - new Date(a.publish_date);
      }),
    friends: state.user.friends?.filter(friend =>
      friend?.family_name?.includes(state.asideSearch) ||
      friend?.given_name?.includes(state.asideSearch)
    ),
    asideSearch: state.asideSearch,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAsideSearch: text => dispatch(setAsideSearch(text)),
    getFriends: () => dispatch(getFriendsMiddleware())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);

