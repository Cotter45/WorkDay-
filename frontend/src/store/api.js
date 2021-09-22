import { csrfFetch } from "./csrf";

const GET_DATA = 'api/get_data';
const JOB_SEARCH_DATA = 'api/search_data';

const job_search_action = (data) => ({
    type: JOB_SEARCH_DATA,
    payload: data
})

const data_action = (data) => ({
    type: GET_DATA,
    payload: data
})

export const job_search = (params) => async dispatch => {
    const response = await csrfFetch(`/api/users/job_search/${params}`);
    const data = await response.json();
    console.log(data);
    dispatch(job_search_action(data));
    return response;
}

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
    images: null,
    job_search: null
}

function data_reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_DATA:
            newState.following = action.payload.user.Follows;
            newState.company = action.payload.user.Company;
            newState.jobs = action.payload.user.Jobs;
            newState.saved_jobs = action.payload.user.Save_for_Laters;
            newState.applications = action.payload.user.Applications;
            newState.conversations = action.payload.user.Conversations;
            newState.posts = action.payload.user.Posts;
            newState.components = action.payload.user.Components;
            newState.images = action.payload.user.Images;
            return newState;
        case JOB_SEARCH_DATA:
            newState.job_search = action.payload.jobResults;
            return newState;
        default: 
            return state;
    }
}

export default data_reducer;