import { ACCEPT_REQUEST_1, ACCEPT_REQUEST_2, ACCEPT_REQUEST_3, CREATE_REQUEST, FETCH_REQUEST, FETCH_REQUESTS, REJECT_REQUEST_1, REJECT_REQUEST_2, REJECT_REQUEST_3, WITHDRAW_REQUEST } from "../constants/actionTypes";

export default (state = { isLoading: true, requests: [],request:[] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_REQUESTS:
            console.log(action.payload)
            return {
                ...state,
                requests: action.payload
            };
        case FETCH_REQUEST:
            return {
                ...state,
                request: action.payload
            };
        case ACCEPT_REQUEST_1:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case REJECT_REQUEST_1:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case ACCEPT_REQUEST_2:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case REJECT_REQUEST_2:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case ACCEPT_REQUEST_3:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case REJECT_REQUEST_3:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case WITHDRAW_REQUEST:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case CREATE_REQUEST:

            return { ...state, requests: [...state.requests, action.payload] };



        default:
            return state;
    }
};