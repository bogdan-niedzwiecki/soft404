export const UPDATE_USER = "UPDATE_USER";

export function updateUser(userData, token) {
  return {
    type: UPDATE_USER,
    payload: { ...userData, token }
  };
}

export function updateUserMiddleware(token, user, photo) {
  return dispatch => {
    let formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    }
    formData.append("user", JSON.stringify(user));
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
      method: "PUT",
      headers: {
        "X-ZUMO-AUTH": token
      },
      body: formData
    })
      .then(response => response.json())
      .then(r => dispatch(updateUser(r, token)));
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
        const user = {
          name: googleResponse.w3.ofa,
          givenName: googleResponse.w3.wea
        };
        dispatch(updateUserMiddleware(r.authenticationToken, user, null));
      });
  };
}
