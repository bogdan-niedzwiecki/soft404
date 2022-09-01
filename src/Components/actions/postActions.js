export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const SET_HEADER_SEARCH = "SET_HEADER_SEARCH";

export const addPostMiddleware = formData => {
  return dispatch => {
    return fetch("/.netlify/functions/post", {
      method: "POST",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
      body: formData
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(addPost(posts)));
  };
};

export function addPost(payload) {
  return { type: ADD_POST, payload }
};

export const editPostMiddleware = (formData) => {
  return dispatch => {
    fetch("/.netlify/functions/post", {
      method: "PUT",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
      body: formData
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText) }
        return response;
      })
      .then(response => response.json())
      .then(posts => { dispatch(editPost(posts)) });
  };
};

export const editPost = payload => {
  return { type: EDIT_POST, payload }
};

export const deletePostMiddleware = formData => {
  return dispatch => {
    fetch("/.netlify/functions/post", {
      method: "DELETE",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
      body: formData
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(posts => { dispatch(deletePost(posts)) });
  };
};

export const deletePost = payload => {
  return { type: DELETE_POST, payload }
};

export const setHeaderSearch = payload => {
  return { type: SET_HEADER_SEARCH, payload }
};


