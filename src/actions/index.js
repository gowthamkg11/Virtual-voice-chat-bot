export const FETCH_VALUE = 'FETCH_VALUE';
export const FETCH_VALUE_SUCCESS = 'FETCH_VALUE_SUCCESS';
export const FETCH_VALUE_FAILURE = 'FETCH_VALUE_FAILURE';

export const fetchValues = () => ({
    type: FETCH_VALUE,
});

export const fetchValuesSuccess = (whiskies) => ({
    type: FETCH_VALUE_SUCCESS,
    payload: whiskies
});

export const fetchValuesFailure = (message) => ({
    type: FETCH_VALUE_FAILURE,
    payload: message
});