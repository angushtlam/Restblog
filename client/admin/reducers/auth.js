import {
  RECEIVE_ADMIN_VERIFICATION,
  REQUEST_ADMIN_VERIFICATION,
  RECEIVE_SESSION_INVALIDATION,
  REQUEST_SESSION_INVALIDATION,
  RECEIVE_SESSION_VALIDITY,
  REQUEST_SESSION_VALIDITY
} from '../actions/auth';

function auth(state = {
  accessKey: '',
  isAuthenticated: false,
  isFetching: false,
  isValidating: true,
  receivedAt: null,
  username: ''
}, action) {
  switch (action.type) {
    case RECEIVE_ADMIN_VERIFICATION: {
      return Object.assign({}, state, {
        accessKey: action.accessKey,
        isAuthenticated: action.isAuthenticated,
        isFetching: false,
        isValidating: false,
        receivedAt: action.receivedAt
      });
    }

    case REQUEST_ADMIN_VERIFICATION: {
      return Object.assign({}, state, {
        isFetching: true,
        username: action.username
      });
    }

    case RECEIVE_SESSION_INVALIDATION: {
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        isValidating: false
      });
    }

    case REQUEST_SESSION_INVALIDATION: {
      return Object.assign({}, state, {
        isValidating: true
      });
    }

    case RECEIVE_SESSION_VALIDITY: {
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        isValidating: false
      });
    }

    case REQUEST_SESSION_VALIDITY: {
      return Object.assign({}, state, {
        isValidating: true
      });
    }

    default:
      return state;
  }
}

export default auth;
