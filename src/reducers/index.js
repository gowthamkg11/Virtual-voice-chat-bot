import {FETCH_VALUE, FETCH_VALUE_FAILURE, FETCH_VALUE_SUCCESS} from "../actions";

const initialState = {
    whiskies: [],
    isLoading: false,
    error: null
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_VALUE:
            return {
                ...state,
                // whenever we want to fetch the whiskies, set isLoading to true to show a spinner
                isLoading: true,
                error: null
            };
        case FETCH_VALUE_SUCCESS:
            return {
                whiskies: [...action.payload],
                // whenever the fetching finishes, we stop showing the spinner and then show the data
                isLoading: false,
                error: null
            };
        case FETCH_VALUE_FAILURE:
            return {
                whiskies: [],
                isLoading: false,
                // same as FETCH_WHISKIES_SUCCESS, but instead of data we will show an error message
                error: action.payload
            };
        default:
            return state;
    }
}
