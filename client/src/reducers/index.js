import { combineReducers } from 'redux';
import sources from './sourceReducer';
import news from './newsReducer';

export default combineReducers({
    sources,
    news
});