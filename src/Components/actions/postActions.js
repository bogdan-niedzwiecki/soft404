export const GET_MY_POSTS = "GET_MY_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const FILTER_POSTS = "FILTER_POSTS";
export const GET_FRIENDS_POSTS = "GET_FRIENDS_POSTS";

export function getMyPosts(myPosts) {
  return {
    type: GET_MY_POSTS,
    payload: myPosts.sort((a, b) => (a.PublishDate > b.PublishDate ? -1 : 1))
  };
}
export function getFriendsPosts(friendsPosts) {
  return {
    type: GET_FRIENDS_POSTS,
    payload: friendsPosts.sort((a, b) =>
      a.PublishDate > b.PublishDate ? -1 : 1
    )
  };
}

export function getAllPostsFromApi() {
  return async dispatch => {
    let all = await Promise.all([
      dispatch(getMyPostsFromApi()),
      dispatch(getFriendsPostsFromApi())
    ]);
    dispatch(getMyPosts(all[0]));
    console.log(all[1]);
    dispatch(getFriendsPosts(all[1]));
  };
}

export function getFriendsPostsFromApi() {
  return dispatch => {
    return fetch(
      "https://delfinkitrainingapi.azurewebsites.net/api/post/friend/",
      {
        method: "GET",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        }
      }
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json());
  };
}

export function getMyPostsFromApi() {
  return dispatch => {
    return fetch("https://delfinkitrainingapi.azurewebsites.net/api/post", {
      method: "GET",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json());
  };
}

export const addPost = newPost => ({
  type: ADD_POST,
  payload: newPost
});

export const fetchPostToAPI = formData => {
  return dispatch => {
    return fetch("https://delfinkitrainingapi.azurewebsites.net/api/post", {
      method: "POST",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => dispatch(addPost(response)));
  };
};

export const editPost = post => ({
  type: EDIT_POST,
  payload: post
});

export const fetchEditedPostToAPI = (id, formData) => {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/post/${id}`, {
      method: "PUT",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        dispatch(editPost(response));
      });
  };
};

export const deletePost = id => ({
  type: DELETE_POST,
  payload: id
});

export const deletePostFromApi = id => {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/post/${id}`, {
      method: "DELETE",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    }).then(() => dispatch(deletePost(id)));
  };
};

export const filterPosts = text => ({
  type: FILTER_POSTS,
  payload: text
});
