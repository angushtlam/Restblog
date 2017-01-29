import {
  RECEIVE_ALL_PAGE_IDS,
  REQUEST_ALL_PAGE_IDS,
  INVALIDATE_ALL_PAGE_IDS
} from '../actions/pageIds';

function pageIds(state = {
  isFetching: false,
  isInvalidated: true,
  pages: []
}, action) {
  switch (action.type) {
    case RECEIVE_ALL_PAGE_IDS: {
      return Object.assign({}, state, {
        isFetching: false,
        isInvalidated: false,
        pages: action.pageIds,
        lastUpdated: action.receivedAt
      });
    }

    case REQUEST_ALL_PAGE_IDS: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }

    case INVALIDATE_ALL_PAGE_IDS: {
      return Object.assign({}, state, {
        isInvalidated: true
      });
    }

    default:
      return state;
  }
}

export default pageIds;
