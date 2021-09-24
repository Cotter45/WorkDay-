import { csrfFetch } from "./csrf";

const GET_DATA = 'api/get_data';
const JOB_SEARCH_DATA = 'api/search_data';
const USER_PAGE = 'api/get_user';
const EDIT_POST = 'api/edit_post';
const CREATE_POST = 'api/create-post';
const DELETE_POST = 'api/delete-post';

const delete_post_action = (postId) => ({
    type: DELETE_POST,
    payload: postId 
})

export const delete_post = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })
    const data = await response.json();
    if (data.error) {
        alert(data.error)
    } else {
        dispatch(delete_post_action(postId));
    }
    return response;
}

const create_post_action = (data) => ({
    type: CREATE_POST,
    payload: data 
})

export const create_post = (post) => async dispatch => {
    const response = await csrfFetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify(post)
    })
    const data = await response.json();
    console.log(data.returnPost, 'STORE')
    dispatch(create_post_action(data.returnPost));
    return response;
}

const edit_post_action = (data) => ({
    type: EDIT_POST,
    payload: data
})

export const edit_post = (post, postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(post)
    })
    const data = await response.json();
    dispatch(edit_post_action(data));
    return response;
}

const store_user_data = (data) => ({
    type: USER_PAGE,
    payload: data
})

export const get_user_data = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/profile/${userId}`);
    const data = await response.json();
    dispatch(store_user_data(data));
    return response;
}

const job_search_action = (data) => ({
    type: JOB_SEARCH_DATA,
    payload: data
})

export const job_search = (params) => async dispatch => {
    const response = await csrfFetch(`/api/users/job_search/${params}`);
    const data = await response.json();
    // console.log(data);
    dispatch(job_search_action(data));
    return response;
}

const data_action = (data) => ({
    type: GET_DATA,
    payload: data
})

export const get_data = (user_id) => async dispatch => {
    const response = await csrfFetch(`/api/users/${user_id}`);
    const data = await response.json();
    dispatch(data_action(data));
    // console.log(data)
    return response;
}

const initialState = { 
    following: null,
    company: null, 
    jobs: null,
    saved_jobs: null,
    applications: null,
    conversations: null,
    my_posts: null,
    posts: null,
    components: null,
    images: null,
    job_search: null,
    team: null,
    users: []
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
            newState.my_posts = action.payload.user.Posts;
            newState.components = action.payload.user.Components;
            newState.images = action.payload.user.Images;
            newState.posts = action.payload.posts;
            newState.team = action.payload.user.Team;
            return newState;
        case JOB_SEARCH_DATA:
            newState.job_search = action.payload.jobResults;
            return newState;
        case USER_PAGE:
            const user = newState.users.find(user => user.id === action.payload.user.id);
            if (!user) {
                newState.users.push(action.payload.user);
            } else {
                newState.users.splice(newState.users.indexOf(user), 1);
                newState.users.push(action.payload.user);
            }
            return newState;
        case CREATE_POST:
            newState.posts.push(action.payload);
            return newState;
        case EDIT_POST:
            const post = newState.posts.find(post => post.id === action.payload.newPost.id);
            newState.posts.splice(newState.posts.indexOf(post), 1);
            newState.posts.push(action.payload.newPost);
            return newState;
        case DELETE_POST:
            const deleteMe = newState.posts.find(post => post.id === action.payload);
            newState.posts.splice(newState.posts.indexOf(deleteMe), 1, {message: 'This post has been removed'});
            return newState;
        default: 
            return state;
    }
}

export default data_reducer;