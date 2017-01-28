import fetch from 'isomorphic-fetch';

export const RECEIVE_ALL_ARTICLE_IDS = 'RECEIVE_ALL_ARTICLE_IDS';
export function receiveAllArticleIds(resp) {
  console.log(resp);
  return {
    type: RECEIVE_ALL_ARTICLE_IDS,
    articleIds: resp,
    receivedAt: new Date()
  };
}

export const REQUEST_ALL_ARTICLE_IDS = 'REQUEST_ALL_ARTICLE_IDS';
export function requestAllArticleIds() {
  return {
    type: REQUEST_ALL_ARTICLE_IDS
  };
}

export function fetchAllArticleIds() {
  return function (dispatch) {
    dispatch(requestAllArticleIds());

    return fetch('/api/articles/list')
      .then((resp) => { return resp.json(); })
      .then((json) => { dispatch(receiveAllArticleIds(json)); })
      .catch(() => { console.log('Error in fetching all Article IDs.'); });
  };
}

export function shouldFetchAllArticleIds(state) {
  const articleIds = state.articlesById;
  if (!articleIds) return true;
  else if (articleIds.isFetching()) return false;
  else return articleIds.isInvalidated();
}
