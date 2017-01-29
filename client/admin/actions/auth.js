import fetch from 'isomorphic-fetch';

export const RECEIVE_ADMIN_VERIFICATION = 'RECEIVE_ADMIN_VERIFICATION';
export function receiveAdminVerification(resp) {
  // If there is an accessKey in the response, that means the login is successful.
  console.log(resp);
  if (resp.accessKey) {
    return {
      type: RECEIVE_ADMIN_VERIFICATION,
      accessKey: resp.accessKey,
      isAuthenticated: true,
      receivedAt: new Date()
    };
  }

  // Otherwise tell the user the login is unsuccessful.
  return {
    type: RECEIVE_ADMIN_VERIFICATION,
    isAuthenticated: false,
    receivedAt: new Date()
  };
}

export const REQUEST_ADMIN_VERIFICATION = 'REQUEST_ADMIN_VERIFICATION';
export function requestAdminVerification(username) {
  return {
    type: REQUEST_ADMIN_VERIFICATION,
    username: username
  };
}

export function attemptLogin(username, password) {
  return function (dispatch) {
    dispatch(requestAdminVerification(username));

    return fetch('/api/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then((resp) => { return resp.json(); })
      .then((json) => { dispatch(receiveAdminVerification(json)); })
      .catch(() => { console.log('Error in verifying user.'); });
  };
}
