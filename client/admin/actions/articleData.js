import fetch from 'isomorphic-fetch';

export const RECEIVE_ARTICLE_DATA = 'RECEIVE_ARTICLE_DATA';
export function receiveArticleData(resp) {
  return {
    type: RECEIVE_ARTICLE_DATA,
    articleId: resp._id,
    author: resp.author,
    body: resp.body,
    createdAt: resp.createdAt,
    isPublished: resp.isPublished,
    lastUpdated: resp.lastUpdated,
    receivedAt: new Date(),
    subtitle: resp.subtitle,
    title: resp.title
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
      .then((resp) => { return resp.json(); })
      .then((json) => { dispatch(receiveArticleData(json)); })
      .catch(() => { console.log('Error in fetching data for Article ' + articleId + '.'); });
  };
}

export function shouldFetchArticleData(state, articleId) {
  const articleData = state.articleData[articleId];
  if (!state.articleData || !articleData) return true;
  else if (articleData.isFetching()) return false;
  else return articleData.isInvalidated();
}
