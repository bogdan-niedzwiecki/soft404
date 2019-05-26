export const ADD_PROFILE = "ADD_PROFILE";
export const DELETE_USER = "DELETE_USER";

export function getTokenMiddleware(googleResponse) {
  return dispatch => {
    fetch("https://delfinkitrainingapi.azurewebsites.net/.auth/login/google", {
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
        sessionStorage.setItem("azure_access_token", r.authenticationToken);
        dispatch(checkProfileMiddleware(googleResponse));
      });
  };
}

export function checkProfileMiddleware(googleResponse) {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
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
      .then(r => {
        if (!r.Name && !r.GivenName && !r.Photo) {
          fetch(googleResponse.w3.Paa)
            .then(response => response.blob())
            .then(r => {
              let formData = new FormData();
              const user = {
                Name: googleResponse.w3.ofa,
                GivenName: googleResponse.w3.wea
              };
              formData.append("user", JSON.stringify(user));
              formData.append("photo", r);
              dispatch(addProfileMiddleware(formData));
            });
        } else {
          dispatch(addProfile(r));
        }
      });
  };
}

export function addProfileMiddleware(formData) {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
      method: "PUT",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(r => dispatch(addProfile(r)));
  };
}
export function addProfile(user) {
  user.Show = true;
  return {
    type: ADD_PROFILE,
    payload: user
  };
}

export function deleteUserMiddleware() {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
      method: "DELETE",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    }).then(() => dispatch(deleteUser()));
  };
}
export function deleteUser() {
  return {
    type: DELETE_USER
  };
}
