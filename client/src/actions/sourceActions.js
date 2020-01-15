export const FETCH_SOURCES_BEGIN   = 'FETCH_SOURCES_BEGIN';
export const FETCH_SOURCES_SUCCESS = 'FETCH_SOURCES_SUCCESS';
export const FETCH_SOURCES_FAILURE = 'FETCH_SOURCES_FAILURE';

export const fetchSourcesBegin = () => ({
  type: FETCH_SOURCES_BEGIN
});

export const fetchSourcesSuccess = sources => ({
  type: FETCH_SOURCES_SUCCESS,
  payload: { sources }
});

export const fetchSourcesFailure = error => ({
  type: FETCH_SOURCES_FAILURE,
  payload: { error }
});

export function fetchSources() {
    return dispatch => {
        dispatch(fetchSourcesBegin());
        return fetch('http://localhost:5000/sources')
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchSourcesSuccess(json));
            return json;
        })
        .catch(error => dispatch(fetchSourcesFailure(error)));
    };
    }

    function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}