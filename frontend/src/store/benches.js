import csrfFetch from './csrf';

export const RECEIVE_BENCHES = 'benches/RECEIVE_BENCHES'

export const receiveBenches = (benches) => {
    return {
        type: RECEIVE_BENCHES,
        benches
    }
}


export const fetchBenches = () => async dispatch => {
    let res = await csrfFetch('/api/benches');
    let data = await res.json();

    dispatch(receiveBenches(data.benches))
}

const benchesReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_BENCHES:
            return action.benches;
        default:
            return state;
    };
};

export default benchesReducer;