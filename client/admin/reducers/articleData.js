import { RECEIVE_ARTICLE_DATA, REQUEST_ARTICLE_DATA } from '../actions/articleData';

function articleData(state = {}, action) {
  switch (action) {
    case RECEIVE_ARTICLE_DATA: {
      let articleMap = {
        isFetching: false,
        title: action.resp.title
      };

      return Object.assign({}, state, articleMap);
    }

    case REQUEST_ARTICLE_DATA: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }

    default:
      return state;
  }
}

export default articleData;
