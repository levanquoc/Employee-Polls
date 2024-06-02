// src/reducers/auth.js

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, RECEIVE_USER } from '../actions/authAction';

const initialState = {
    isAuthenticated: false,
    user: null,
    users: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user,
                users : action.users
            };
        case LOGIN_FAIL:
            return {
                ...state,
            };
        case RECEIVE_USER:
            return {
                ...state,
                users : action.users
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;
