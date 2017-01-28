import fetch from 'isomorphic-fetch';

export const RECEIVE_ARTICLE_DATA = 'RECEIVE_ARTICLE_DATA';
export function receiveArticleData(resp) {
  return {
    type: RECEIVE_ARTICLE_DATA,
    articleIds: resp.data
  };
}

export const REQUEST_ARTICLE_DATA = 'REQUEST_ARTICLE_DATA';
export function requestArticleData(articleId) {
  return {
    type: REQUEST_ARTICLE_DATA,
    articleId
  };
}

export function fetchArticleData(articleId) {
  return function (dispatch) {
    dispatch(requestArticleData(articleId));

    return fetch('/api/article/get/' + articleId)
      .then((response) => { return response.json(); })
      .then((json) => { dispatch(receiveArticleData(json)); console.log(json); })
      .catch(() => { console.log('Error in fetching data for Article ' + articleId + '.'); });
  };
}

export function shouldFetchArticleData(state, articleId) {
  const articleData = state.articleData[articleId];
  if (!state.articleData || !articleData) return true;
  else if (articleData.isFetching()) return false;
  else return articleData.isInvalidated();
}
