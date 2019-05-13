export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    payload: posts.sort((a, b) => (a.PublishDate > b.PublishDate ? -1 : 1))
  };
}

export function getPostsMiddleware() {
  return dispatch => {
    fetch("https://delfinkitrainingapi.azurewebsites.net/api/post", {
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
      .then(r => dispatch(getPosts(r)));
  };
}

export const addPost = (newPost) => ({
  type: ADD_POST,
  payload: { newPost
  }
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
      .then(response => dispatch(addPost(  response)));
  };
};

export const editPost = post => ({
  type: EDIT_POST,
  payload: {
    editedPost: post
  }
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
