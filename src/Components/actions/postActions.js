export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    payload: posts.sort((a, b) => (a.PublishDate > b.PublishDate ? -1 : 1))
  };
}

export function getPostsMiddleware(url, token) {
  return dispatch => {
    fetch(url, {
      method: "GET",
      headers: {
        "X-ZUMO-AUTH": token
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

export const addPost = (formData, resp) => ({
  type: ADD_POST,
  payload: {
    post: {
      Title: JSON.parse(formData.get("post")).title,
      Text: JSON.parse(formData.get("post")).text,
      Id: resp.Id,
      ThumbnailPhoto: resp.ThumbnailPhoto,
      PublishDate: resp.PublishDate,
      UserId: resp.UserId
    }
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
      .then(r => r.json())
      .then(resp => dispatch(addPost(formData, resp)));
  };
};

export const deletePost = post => ({
  type: DELETE_POST,
  payload: {
    postToDel: post
  }
});

export const deletePostFromApi = (post, usertoken) => {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/post/${post.Id}`, {
      method: "DELETE",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    })
      .then(response => response.json())
      .then(resp => dispatch(deletePost(post)));
  };
};
