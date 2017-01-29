import { RECEIVE_ADMIN_VERIFICATION, REQUEST_ADMIN_VERIFICATION } from '../actions/auth';

function auth(state = {
  accessKey: '',
  isAuthenticated: false,
  isFetching: false,
  receivedAt: null,
  username: ''
}, action) {
  switch (action.type) {
    case RECEIVE_ADMIN_VERIFICATION: {
      return Object.assign({}, state, {
        accessKey: action.accessKey,
        isAuthenticated: action.isAuthenticated,
        isFetching: false,
        receivedAt: action.receivedAt
      });
    }

    case REQUEST_ADMIN_VERIFICATION: {
      return Object.assign({}, state, {
        isFetching: true,
        username: action.username
      });
    }

    default:
      return state;
  }
}

export default auth;
