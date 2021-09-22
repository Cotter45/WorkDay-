import { csrfFetch } from "./csrf";

const GET_DATA = 'api/get_data';

const data_action = (data) => ({
    type: GET_DATA,
    payload: data
})

export const get_data = (user_id) => async dispatch => {
    const response = await csrfFetch(`/api/users/${user_id}`);
    const data = await response.json();
    dispatch(data_action(data));
    console.log(data)
    return response;
}

const initialState = { 
    following: null,
    company: null, 
    jobs: null,
    saved_jobs: null,
    applications: null,
    conversations: null,
    posts: null,
    components: null,
    images: null
}

function data_reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_DATA:
            newState = action.payload.user;
            return newState;
        default: 
            return state;
    }
}

export default data_reducer;