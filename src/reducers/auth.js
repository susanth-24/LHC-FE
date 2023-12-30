import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, userData: [],notifications:null,getusers:null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data, loading: false, errors: null };

        case actionType.SIGNUP:
            //localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };

        case actionType.USER_PROFILE:
            return { ...state, userData: action.payload.data, loading: false, errors: null }

        case actionType.FOLLOW_USER:
            return { ...state, userData: action.payload.data }

        case actionType.DELETE_USER:
            if (Array.isArray(state.userData)) {
                return {
                    ...state,
                    userData: state.userData.filter((user) => user._id !== action.payload),
                };
            }
        case actionType.CHANGE_PASSWORD:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };

        case actionType.FETCH_NOTIFY:
            //console.log(action.payload)
            return {...state,notifications:action.payload}

        case actionType.CLEAR_NOTIFY:
            return {
                ...state,notifications:null
            }
        
        case actionType.ALLUSERS:
            return {
                ...state,getusers:action.payload
            }
        default:
            return state;
    }
};

export default authReducer;