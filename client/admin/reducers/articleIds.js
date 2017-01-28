import { RECEIVE_ALL_ARTICLE_IDS, REQUEST_ALL_ARTICLE_IDS } from '../actions/articleIds';

function articleIds(state = {
  isFetching: false,
  isInvalidated: false,
  articles: null
}, action) {
  switch (action.type) {
    case RECEIVE_ALL_ARTICLE_IDS: {
      return Object.assign({}, state, {
        isFetching: false,
        isInvalidated: false,
        articles: action.articleIds,
        lastUpdated: action.receivedAt
      });
    }

    case REQUEST_ALL_ARTICLE_IDS: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }

    default:
      return state;
  }
}

export default articleIds;
