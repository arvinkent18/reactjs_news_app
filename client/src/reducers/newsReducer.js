import {
    FETCH_NEWS_BEGIN,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE
  } from '../actions/newsActions';
  
  const initialState = {
    items: {articles: []},
    loading: false,
    error: null
  };
  
  export default function newsReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_NEWS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_NEWS_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.news
        };
  
      case FETCH_NEWS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };
  
      default:
        return state;
    }
  }