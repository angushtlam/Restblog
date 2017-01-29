import { RECEIVE_ARTICLE_DATA, REQUEST_ARTICLE_DATA } from '../actions/articleData';

function articleData(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ARTICLE_DATA: {
      let articleMap = {};
      articleMap[action.articleId] = {
        isFetching: false,
        author: action.author,
        body: action.body,
        createdAt: action.createdAt,
        isPublished: action.isPublished,
        lastUpdated: action.lastUpdated,
        receivedAt: action.receivedAt,
        subtitle: action.subtitle,
        title: action.title
      };

      return Object.assign({}, state, articleMap);
    }

    case REQUEST_ARTICLE_DATA: {
      let articleMap = {};
      articleMap[action.articleId] = {
        isFetching: true
      };

      return Object.assign({}, state, articleMap);
    }

    default:
      return state;
  }
}

export default articleData;
