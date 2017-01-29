import { combineReducers } from 'redux';

// Import other reducers
import articleData from './articleData';
import articleIds from './articleIds';
import auth from './auth';
import pageData from './pageData';
import pageIds from './pageIds';

const reducer = combineReducers({
  articleData,
  articleIds,
  auth,
  pageData,
  pageIds
});

export default reducer;
