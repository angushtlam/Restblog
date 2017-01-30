import {
  RECEIVE_PAGE_DATA,
  REQUEST_PAGE_DATA,
  INVALIDATE_ALL_PAGE_DATA
} from '../actions/pageData';

function pageData(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PAGE_DATA: {
      let pageMap = {};
      pageMap[action.pageId] = {
        author: action.author,
        body: action.body,
        createdAt: action.createdAt,
        isFetching: false,
        isPublished: action.isPublished,
        lastUpdated: action.lastUpdated,
        receivedAt: action.receivedAt,
        subtitle: action.subtitle,
        title: action.title
      };

      return Object.assign({}, state, pageMap);
    }

    case REQUEST_PAGE_DATA: {
      let pageMap = {};
      pageMap[action.pageId] = {
        isFetching: true
      };

      return Object.assign({}, state, pageMap);
    }

    case INVALIDATE_ALL_PAGE_DATA: {
      return {};
    }

    default:
      return state;
  }
}

export default pageData;
