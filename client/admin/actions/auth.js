import fetch from 'isomorphic-fetch';

export const RECEIVE_ADMIN_VERIFICATION = 'RECEIVE_ADMIN_VERIFICATION';
export function receiveAdminVerification(resp) {
  // If there is an accessKey in the response, that means the login is successful.
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
    username
  };
}

export const RECEIVE_SESSION_VALIDITY = 'RECEIVE_SESSION_VALIDITY';
export function receiveSessionValidity(resp) {
  return {
    type: RECEIVE_SESSION_VALIDITY,
    isAuthenticated: resp.responseCode === 'SUCCESS'
  };
}

export const REQUEST_SESSION_VALIDITY = 'REQUEST_SESSION_VALIDITY';
export function requestSessionValidity(accessKey) {
  return {
    type: REQUEST_SESSION_VALIDITY,
    accessKey
  };
}

export const RECEIVE_SESSION_INVALIDATION = 'RECEIVE_SESSION_INVALIDATION';
export function receiveSessionInvalidation(resp) {
  return {
    type: RECEIVE_SESSION_INVALIDATION,
    isAuthenticated: resp.responseCode !== 'SUCCESS'
  };
}

export const REQUEST_SESSION_INVALIDATION = 'REQUEST_SESSION_INVALIDATION';
export function requestSessionInvalidation(accessKey) {
  return {
    type: REQUEST_SESSION_INVALIDATION,
    accessKey
  };
}

export function attemptLogin(username, password) {
  return function (dispatch) {
    dispatch(requestAdminVerification(username));

    return fetch('/api/auth/verify', {
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

export function checkSessionValidity(accessKey) {
  return function (dispatch) {
    dispatch(requestSessionValidity(accessKey));

    return fetch('/api/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessKey
      })
    }).then((resp) => { return resp.json(); })
      .then((json) => { dispatch(receiveSessionValidity(json)); })
      .catch(() => { console.log('Error in checking user validation.'); });
  };
}

export function attemptSessionInvalidation(accessKey) {
  return function (dispatch) {
    dispatch(requestSessionInvalidation(accessKey));

    return fetch('/api/auth/invalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessKey
      })
    }).then((resp) => { return resp.json(); })
      .then((json) => { dispatch(receiveSessionInvalidation(json)); })
      .catch(() => { console.log('Error in invalidating user.'); });
  };
}
