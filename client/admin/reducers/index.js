import { combineReducers } from 'redux';
import articleData from './articleData';
import articleIds from './articleIds';

const reducer = combineReducers({
  articleData,
  articleIds
});

export default reducer;
