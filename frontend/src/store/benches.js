import csrfFetch from './csrf';

export const RECEIVE_BENCHES = 'benches/RECEIVE_BENCHES'
export const RECEIVE_BENCH = 'benches/RECEIVE_BENCH'

export const receiveBenches = (benches) => {
    return {
        type: RECEIVE_BENCHES,
        benches
    }
}
export const receiveBench = (bench) => {
    return {
        type: RECEIVE_BENCH,
        bench
    }
}


export const fetchBenches = () => async dispatch => {
    let res = await csrfFetch('/api/benches');
    let data = await res.json();

    dispatch(receiveBenches(data.benches))
}

export const fetchBench = (benchId) => async dispatch => {
    let res = await csrfFetch(`/api/benches/${benchId}`)
    let data = await res.json();

    dispatch(receiveBench(data.bench));
}

export const createBench = (bench) => async dispatch => {
    let res = await csrfFetch('/api/benches', {
        method: 'POST',
        body: JSON.stringify(bench)
    });

    let data = await res.json();
    dispatch(receiveBench(data.bench));
}

const benchesReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_BENCHES:
            return action.benches;
        case RECEIVE_BENCH:
            let newState = Object.assign({}, state);
            newState[action.bench.id] = action.bench;
            return newState;
        default:
            return state;
    };
};

export default benchesReducer;