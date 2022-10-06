import csrfFetch from "./csrf";

// ACTION TYPE CONSTANTS
export const RECEIVE_USER = 'user/RECEIVE_USER';
export const REMOVE_USER = 'user/REMOVE_USER';

// ACTIONS CREATORS

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    };
};

export const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        userId
    };
};

// THUNK ACTION CREATORS

export const signupUser = (user) => async dispatch => {
    let res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch(receiveUser(data.user))
}

export const loginUser = (user) => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch(receiveUser(data.user));
};

export const logoutUser = (userId) => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    sessionStorage.setItem('currentUser', null);
    dispatch(removeUser(userId));
};

// REDUCER
const sessionReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_USER:
            return { ...state, user: action.user}
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}

export default sessionReducer;