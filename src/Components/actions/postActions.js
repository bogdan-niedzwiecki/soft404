export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";

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

export const deletePost = post => ({
  type: DELETE_POST,
  payload: {
    postToDel: post
  }
});

export const deletePostFromApi = (post, authToken) => {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/post/${post.Id}`, {
      method: "DELETE",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    }).then(resp => dispatch(deletePost(post)));
  };
};

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
