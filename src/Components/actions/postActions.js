export const GET_MY_POSTS = "GET_MY_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const SET_MAIN_SEARCH = "SET_MAIN_SEARCH";

export function getMyPostsMiddleware() {
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
      .then(response => response.json())
      .then(r => dispatch(getMyPosts(r)));
  };
}
export function getMyPosts(myPosts) {
  return {
    type: GET_MY_POSTS,
    payload: myPosts.sort((a, b) => (a.PublishDate > b.PublishDate ? -1 : 1))
  };
}

///////////////////////////////////////////
export const addPost = newPost => ({
  type: ADD_POST,
  payload: newPost
});

export const addPostMiddleware = formData => {
  return dispatch => {
    return fetch("https://delfinkitrainingapi.azurewebsites.net/api/post", {
      method: "POST",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      },
      body: formData
    })
      .then(response => response.json())
      .then(r => dispatch(addPost(r)));
  };
};

export const editPostMiddleware = (id, formData) => {
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
export const editPost = post => ({
  type: EDIT_POST,
  payload: post
});

export const deletePostMiddleware = id => {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/post/${id}`, {
      method: "DELETE",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    }).then(() => dispatch(deletePost(id)));
  };
};
export const deletePost = id => ({
  type: DELETE_POST,
  payload: id
});

export const setMainSearch = text => ({
  type: SET_MAIN_SEARCH,
  payload: text
});
