import { combineReducers } from 'redux';
import articleData from './articleData';
import articleIds from './articleIds';
import auth from './auth';

const reducer = combineReducers({
  articleData,
  articleIds,
  auth
});

export default reducer;
