import fetch from 'isomorphic-fetch';

export const RECEIVE_ALL_PAGE_IDS = 'RECEIVE_ALL_PAGE_IDS';
export function receiveAllPageIds(resp) {
  return {
    type: RECEIVE_ALL_PAGE_IDS,
    pageIds: resp,
    receivedAt: new Date()
  };
}

export const REQUEST_ALL_PAGE_IDS = 'REQUEST_ALL_PAGE_IDS';
export function requestAllPageIds() {
  return {
    type: REQUEST_ALL_PAGE_IDS
  };
}

export const INVALIDATE_ALL_PAGE_IDS = 'INVALIDATE_ALL_PAGE_IDS';
export function invalidateAllPageIds() {
  return {
    type: INVALIDATE_ALL_PAGE_IDS
  };
}

export function fetchAllPageIds() {
  return function (dispatch) {
    dispatch(requestAllPageIds());

    return fetch('/api/pages/list')
      .then((resp) => { return resp.json(); })
      .then((json) => { dispatch(receiveAllPageIds(json)); })
      .catch(() => { console.log('Error in fetching all Page IDs.'); });
  };
}

export function shouldFetchAllPageIds(state) {
  const pageIds = state.pageIds;
  if (!pageIds) return true;
  else if (pageIds.isFetching()) return false;
  else return pageIds.isInvalidated();
}
