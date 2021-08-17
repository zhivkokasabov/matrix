import { combineReducers } from 'redux';
import apiCallsInProgress from './apiStatusReducer';
import options from './optionsReducer';
import articles from './articlesReducer';

const rootReducer = combineReducers({
  options,
  articles,
  apiCallsInProgress
});

export default rootReducer;
