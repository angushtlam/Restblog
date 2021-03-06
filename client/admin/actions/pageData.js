import fetch from 'isomorphic-fetch';

export const RECEIVE_PAGE_DATA = 'RECEIVE_PAGE_DATA';
export function receivePageData(resp) {
  return {
    type: RECEIVE_PAGE_DATA,
    pageId: resp._id,
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

export const REQUEST_PAGE_DATA = 'REQUEST_PAGE_DATA';
export function requestPageData(pageId) {
  return {
    type: REQUEST_PAGE_DATA,
    pageId
  };
}

export const INVALIDATE_ALL_PAGE_DATA = 'INVALIDATE_ALL_PAGE_DATA';
export function invalidateAllPageData() {
  return {
    type: INVALIDATE_ALL_PAGE_DATA
  };
}

export function fetchPageData(pageId, accessKey) {
  return function (dispatch) {
    dispatch(requestPageData(pageId));

    return fetch('/api/page/get/' + pageId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accessKey: accessKey })
    })
      .then((resp) => { return resp.json(); })
      .then((json) => { dispatch(receivePageData(json)); })
      .catch(() => { console.log('Error in fetching data for Page ' + pageId + '.'); });
  };
}

export function shouldFetchPageData(state, pageId) {
  const pageData = state.pageData[pageId];
  if (!state.pageData || !pageData) return true;
  else if (pageData.isFetching()) return false;
  else return pageData.isInvalidated();
}

export function updatePageData(pageId, pageData, accessKey) {
  return function (dispatch) {
    dispatch(requestPageData(pageId));

    const postMap = { accessKey };
    if (pageData.title) postMap['title'] = pageData.title;
    if (pageData.subtitle) postMap['subtitle'] = pageData.subtitle;
    if (pageData.body) postMap['body'] = pageData.body;
    if (pageData.isPublished) postMap['isPublished'] = pageData.isPublished;
    if (pageData.silentUpdate) postMap['silentUpdate'] = pageData.silentUpdate;

    console.log(postMap);

    return fetch('/api/page/update/' + pageId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postMap)
    })
      .then((resp) => { return resp.json(); })
      .then(() => { dispatch(fetchPageData(pageId, accessKey)); })
      .catch(() => { console.log('Error in updating data for Page ' + pageId + '.'); });
  };
}
