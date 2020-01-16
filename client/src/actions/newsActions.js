export const FETCH_NEWS_BEGIN   = 'FETCH_NEWS_BEGIN';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_BY_SOURCE = 'FETCH_NEWS_BY_SOURCE';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNewsBegin = () => ({
  type: FETCH_NEWS_BEGIN
});

export const fetchNewsSuccess = news => ({
  type: FETCH_NEWS_SUCCESS,
  payload: { news }
});

export const fetchNewsBySource = (news, id) => ({
  type: FETCH_NEWS_BY_SOURCE,
  payload: { news, id }
});

export const fetchNewsFailure = error => ({
  type: FETCH_NEWS_FAILURE,
  payload: { error }
});

export function fetchNews(source = '', pageNum) {
    if (source != '') {
      return dispatch => {
        dispatch(fetchNewsBegin());
        return fetch('/news/'+source+'/page/'+pageNum)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            dispatch(fetchNewsBySource(json));
            return json;
        })
        .catch(error => dispatch(fetchNewsFailure(error)));
      };
    }
    else {
      return dispatch => {
        dispatch(fetchNewsBegin());
        return fetch('/news')
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            dispatch(fetchNewsSuccess(json));
            return json;
        })
        .catch(error => dispatch(fetchNewsFailure(error)));
      };
    }
}

    function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}