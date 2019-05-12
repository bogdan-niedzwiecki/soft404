export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export function updateUser(userData, Token, Photo) {
  return {
    type: UPDATE_USER,
    payload: { ...userData, Token, Photo }
  };
}

export function updateUserMiddleware(token, userData, userPhoto) {
  return dispatch => {
    let formData = new FormData();
    if (userPhoto) {
      formData.append("photo", userPhoto);
    }
    formData.append("user", JSON.stringify(userData));
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
      method: "PUT",
      headers: {
        "X-ZUMO-AUTH": token
      },
      body: formData
    })
      .then(response => response.json())
      .then(r => dispatch(updateUser(r, token, userPhoto)));
  };
}

export function getTokenMiddleware(url, googleResponse) {
  return dispatch => {
    fetch(url, {
      method: "POST",
      headers: { "content-type": "Application/JSON" },
      body: JSON.stringify({
        id_token: googleResponse.tokenId
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(r => {
        const userData = {
          name: googleResponse.w3.ofa,
          givenName: googleResponse.w3.wea
        };
        const userPhoto = googleResponse.w3.Paa;
        dispatch(
          updateUserMiddleware(r.authenticationToken, userData, userPhoto)
        );
      });
  };
}

/////////////////////////////////Dima//////////////////////////////////////
export const deleteUser = () => ({
  type: DELETE_USER
});

export const deleteUserFromApi = token => dispatch => {
  fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
    method: "DELETE",
    headers: {
      "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
    }
  });
  return dispatch(deleteUser());
};
