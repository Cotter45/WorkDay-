import { csrfFetch } from "./csrf";

const GET_DATA = 'api/get_data';
const GET_JOB_DATA = 'api/get_job_data';
const SEARCH_DATA = 'api/search_data';
const USER_PAGE = 'api/get_user';
const EDIT_POST = 'api/edit_post';
const CREATE_POST = 'api/create-post';
const DELETE_POST = 'api/delete-post';
const UPDATE_JOB = 'api/update-job';
const CREATE_JOB = 'api/create-job';
const DELETE_JOB = 'api/delete-job';
const LIKE_POST = 'api/like-post';
const ADD_COMMENT = 'api/add-comment';
const EDIT_COMMENT = 'api/edit-comment';
const DELETE_COMMENT = 'api/delete-comment';
const EDIT_PROFILE = 'api/edit-profile';
const APPLY_TO_JOB = 'api/apply_to_job';
const DELETE_APP = 'api/delete_app_for_job';
const SAVE_JOB = 'api/save_job_for_later';
const DELETE_SAVE = 'api/delete_save_job';
const LIKE_COMMENT = 'api/like_comment';
const GET_RECENT_JOBS = 'api/get_recent_jobs';
const GET_TASKS = 'api/get_tasks';
const COMPLETE_TASK = 'api/complete_task';
const CREATE_TASK = 'api/create_task';
const MOVE_TASK_POSITION = 'api/move_task_position';
const DELETE_TASK = 'api/delete_task';
const DELETE_IMAGE = 'api/delete_image';

const delete_image_action = (data) => ({
    type: DELETE_IMAGE,
    payload: data
})

export const delete_image = (id) => async dispatch => {
    const fetch = await csrfFetch(`/api/users/delete_image/${id}`, {
        method: 'DELETE',
    })
    const response = await fetch.json();
    if (response.message !== "Image deleted successfully." ) {
        alert(response.message);
    }
    return response;
}

const delete_task_action = (data) => ({
    type: DELETE_TASK,
    payload: data
})

export const delete_task = (task_id) => async dispatch => {
    const fetch = await csrfFetch(`/api/users/delete_task/${task_id}`, {
        method: 'DELETE'
    })
    const response = await fetch.json();
    if (response.message === 'Task deleted successfully') {
        dispatch(delete_task_action(response));
        return response;
    } else {
        alert('Something went wrong');
    }
}

const move_task_action = (data) => ({
    type: MOVE_TASK_POSITION,
    payload: data
})

export const move_task = (tasks) => async dispatch => {
    const fetch = await csrfFetch(`/api/users/move_tasks`, {
        method: 'PUT',
        body: JSON.stringify({ tasks })
    })
    const response = await fetch.json();
    if (!response.error) {
    dispatch(move_task_action(response));
    } else {
        alert(response.error);
    }
    return response;
}

const create_task_action = (data) => ({
    type: CREATE_TASK,
    payload: data
})

export const create_task = (task) => async dispatch => {
    const formData = new FormData();
    const { imagesToUpload } = task;

    imagesToUpload.forEach(image => {
        formData.append('imagesToUpload', image);
    })

    delete task.imagesToUpload;
    for (let key in task) {
        formData.append(key, task[key]);
    }

    const fetch = await csrfFetch('/api/users/create_task', {
        method: 'POST',
        headers: {
                "Content-Type": "multipart/form-data"
            },
        body: formData
    });
    const response = await fetch.json();
    dispatch(create_task_action(response));
    return response;
}

const complete_task_action = (data) => ({
    type: COMPLETE_TASK,
    payload: data
})

export const complete_task = (task_id) => async dispatch => {
    const fetch = await csrfFetch(`/api/users/complete_task/${task_id}`, {
        method: 'POST'
    })
    const response = await fetch.json();
    if (!response.error) {
        dispatch(complete_task_action(response));
    } else {
        alert(response.error);
    }
    return response;
}

const get_tasks_action = (data) => ({
    type: GET_TASKS,
    payload: data
})

export const get_tasks = (userId) => async dispatch => {
    const fetch = await csrfFetch(`/api/users/get_tasks/${userId}`)
    const response = await fetch.json();
    dispatch(get_tasks_action(response))
    return response;
}

const recent_jobs_action = (data) => ({
    type: GET_RECENT_JOBS,
    payload: data
})

export const get_jobs = (data) => async dispatch =>{
    const fetch = await csrfFetch('/api/jobs/recent')
    const response = await fetch.json();
    dispatch(recent_jobs_action(response));
    return response;
}

const like_comment_action = (data) => ({
    type: LIKE_COMMENT,
    payload: data 
})

export const like_comment = (data) => async dispatch => {
    const fetch = await csrfFetch(`/api/posts/comments/${data.comment_id}`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const response = await fetch.json();
    dispatch(like_comment_action(response));
    return response;
}

const get_job_data_action = (data) => ({
    type: GET_JOB_DATA,
    payload: data 
})

export const get_job_data = (userId) => async dispatch => {
    const fetch = await csrfFetch(`/api/users/jobs/${userId}`);
    const response = await fetch.json();
    dispatch(get_job_data_action(response));
    return response;
}


const delete_save_job_action = (data) => ({
    type: DELETE_SAVE,
    payload: data 
})

const save_job_action = (data) => ({
    type: SAVE_JOB,
    payload: data 
})

export const save_job = (save) => async dispatch => {
    const fetch = await csrfFetch(`/api/jobs/save/${save.job_id}`, {
        method: 'POST',
        body: JSON.stringify(save)
    })
    const response = await fetch.json();
    if (response.newSave) {
        dispatch(save_job_action(response));
    } else {
        dispatch(delete_save_job_action(response));
    }
    return fetch;
}

const delete_job_application_action = (data) => ({
    type: DELETE_APP,
    payload: data 
})

const job_application_action = (data) => ({
    type: APPLY_TO_JOB,
    payload: data 
})

export const job_application = (application) => async dispatch => {
    const fetch = await csrfFetch(`/api/jobs/apply/${application.job_id}`, {
        method: 'POST',
        body: JSON.stringify(application)
    })
    const response = await fetch.json();
    if (response.job) {
        dispatch(job_application_action(response));
    } else {
        dispatch(delete_job_application_action(response));
    }
    return fetch;
}

const edit_profile_action = (data) => ({
    type: EDIT_PROFILE,
    payload: data 
})

export const edit_profile = (user, userId) => async dispatch => {
    const { background_image,
            profile_picture,} = user;
            
    if (background_image.name && profile_picture.name) {
        let formData1 = new FormData();
        formData1.append('image', profile_picture);
        const fetch1 = await csrfFetch(`/api/users/profile_picture/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData1
        })
        const response1 = await fetch1.json();
        user.profile_picture = response1.profile_picture;

        let formData2 = new FormData();
        formData2.append('image', background_image);
        const fetch2 = await csrfFetch(`/api/users/background_image/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData2
        })
        const response2 = await fetch2.json();
        user.background_image = response2.background_image;

        const fetch3 = await csrfFetch(`/api/users/update_profile/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user)
        })
        const data = await fetch3.json();
        dispatch(edit_profile_action(data));
        return fetch3;

    } else if (!background_image.name && profile_picture.name) {

        let formData1 = new FormData();
        formData1.append('image', profile_picture);
        const fetch1 = await csrfFetch(`/api/users/profile_picture/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData1
        })
        const response1 = await fetch1.json();
        user.profile_picture = response1.profile_picture;

        const fetch3 = await csrfFetch(`/api/users/update_profile/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user)
        })
        const data = await fetch3.json();
        dispatch(edit_profile_action(data));
        return fetch3;

    } else if (!profile_picture.name && background_image.name) {

        let formData2 = new FormData();
        formData2.append('image', background_image);
        const fetch2 = await csrfFetch(`/api/users/background_image/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData2
        })
        const response2 = await fetch2.json();
        user.background_image = response2.background_image;

        const fetch3 = await csrfFetch(`/api/users/update_profile/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user)
        })
        const data = await fetch3.json();
        dispatch(edit_profile_action(data));
        return fetch3;
    } else {
        const response = await csrfFetch(`/api/users/update_profile/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user)
        })
        const data = await response.json();
        dispatch(edit_profile_action(data));
        return response;
    }
}

const delete_comment_action = (data) => ({
    type: DELETE_COMMENT,
    payload: data
})

export const delete_comment = (comment_id) => async dispatch => {
    const response = await csrfFetch(`/api/posts/comments/${comment_id}`, {
        method: 'DELETE'
    })
    const data = await response.json();
    dispatch(delete_comment_action(data));
    return response;
}

const edit_comment_action = (data) => ({
    type: EDIT_COMMENT,
    payload: data
})

export const edit_comment = (newComment, comment_id) => async dispatch => {
    const { comment, image_url, user_id, post_id } = newComment;
    let formData = new FormData();

    if (image_url.name) {
        formData.append('comment', comment);
        formData.append('image', image_url);
        formData.append('user_id', user_id);
        formData.append('post_id', post_id);

        const response = await csrfFetch(`/api/posts/comments/${comment_id}`, {
            method: 'PUT', 
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData 
        })
        const data = await response.json();
        dispatch(edit_comment_action(data));
        return response;
    } else {
        const response = await csrfFetch(`/api/posts/comments/${comment_id}`, {
            method: 'PUT', 
            body: JSON.stringify(newComment) 
        })
        const data = await response.json();
        dispatch(edit_comment_action(data));
        return response;
    }
}

const add_comment_action = (post) => ({
    type: ADD_COMMENT,
    payload: post 
})

export const add_comment = (newComment, postId) => async dispatch => {
    const { comment, image_url, user_id } = newComment;
    let formData = new FormData();

    if (image_url.name) {
        formData.append('comment', comment);
        formData.append('image', image_url);
        formData.append('user_id', user_id);

        const response = await csrfFetch(`/api/posts/${postId}/comment`, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData 
        })
        const data = await response.json();
        dispatch(add_comment_action(data));
        return response;
    } else {
        const response = await csrfFetch(`/api/posts/${postId}/comment`, {
            method: 'POST',
            body: JSON.stringify(newComment) 
        })
        const data = await response.json();
        dispatch(add_comment_action(data));
        return response;
    }
}

const like_post_action = (data) => ({
    type: LIKE_POST,
    payload: data
})

export const like_post = ({postId, userId}) => async dispatch => {
    const response = await csrfFetch(`/api/posts/like/${postId}`, {
        method: 'POST',
        body: JSON.stringify({userId})
    })
    const data = await response.json();
    dispatch(like_post_action(data));
    return response;
}

const delete_job_action = (data) => ({
    type: DELETE_JOB,
    payload: data 
})

export const delete_job = (job_id) => async dispatch => {
    const response = await csrfFetch(`/api/jobs/${job_id}`, {
        method: 'DELETE'
    })
    const data = await response.json();
    if (!data.message) {
        dispatch(delete_job_action(data))
    } else if (data.message) {
        alert(data.message);
    }
    return response;
}

const create_job_action = (job) => ({
    type: CREATE_JOB,
    payload: job 
})

export const create_job = (job) => async dispatch => {
    const response = await csrfFetch('/api/jobs/', {
        method: 'POST',
        body: JSON.stringify(job) 
    })
    const data = await response.json();
    dispatch(create_job_action(data));
    return response;
}

const update_job_action = (job) => ({
    type: UPDATE_JOB,
    payload: job 
})

export const update_job = (job, job_id) => async dispatch => {
    const response = await csrfFetch(`/api/jobs/${job_id}`, {
        method: 'PUT',
        body: JSON.stringify(job)
    })
    const data = await response.json();
    dispatch(update_job_action(data));
    return response;
}

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
    const { description, image_url, poster_id, company_id } = post;
    let formData = new FormData();

    if (image_url.name) {
        formData.append('description', description);
        formData.append('image', image_url);
        formData.append('poster_id', poster_id);
        formData.append('company_id', company_id);

        const response = await csrfFetch(`/api/posts/`, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData
        })
        const data = await response.json();
        dispatch(create_post_action(data.returnPost));
        return response;
    } else {
        const response = await csrfFetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify(post)
        })
        const data = await response.json();
        dispatch(create_post_action(data.returnPost));
        return response;
    }
}

const edit_post_action = (data) => ({
    type: EDIT_POST,
    payload: data
})

export const edit_post = (post, postId) => async dispatch => {
    const { description, imageUrl } = post;
    let formData = new FormData();

    if (post.imageUrl.name) {
        formData.append('description', description);
        formData.append('image', imageUrl);
        const response = await csrfFetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData
        })
        const data = await response.json();
        dispatch(edit_post_action(data));
        return response;
    } else {
        const response = await csrfFetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(post)
        })
        const data = await response.json();
        dispatch(edit_post_action(data));
        return response;
    }
}

const store_user_data = (data) => ({
    type: USER_PAGE,
    payload: data
})

export const get_user_data = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/profile/${userId}`);
    const data = await response.json();
    if (data.user) {
        dispatch(store_user_data(data));
    } else {
        window.location = window.location.origin + '//';
    }
    return response;
}

const search_action = (data) => ({
    type: SEARCH_DATA,
    payload: data
})

export const search = (params) => async dispatch => {
    const response = await csrfFetch(`/api/users/search/${params}`);
    const data = await response.json();
    dispatch(search_action(data));
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
    return response;
}

const initialState = { 
    following: null,
    company: null, 
    jobs: [],
    saved_jobs: [],
    applications: [],
    conversations: null,
    // my_posts: null,
    posts: null,
    components: null,
    images: null,
    search: [],
    team: null,
    users: [], 
    recent_jobs: [],
    tasks: [],
}

function data_reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_DATA:
            newState.following = action.payload.user.Follows;
            newState.company = action.payload.user.Company;
            // newState.jobs = action.payload.user.Jobs;
            // newState.saved_jobs = action.payload.user.Save_for_Laters;
            // newState.applications = action.payload.user.Applications;
            newState.conversations = action.payload.user.Conversations;
            // newState.my_posts = action.payload.user.Posts;
            newState.components = action.payload.user.Components;
            newState.images = action.payload.user.Images;
            newState.posts = action.payload.posts;
            newState.team = action.payload.user.Team;
            const updated_user = newState.users.find(user => user.id === action.payload.user.id);
            if (updated_user) {
                newState.users.splice(newState.users.indexOf(updated_user), 1, action.payload.user);
            } else {
                newState.users.push(action.payload.user);
            }
            return newState;
        case GET_JOB_DATA:
            newState.jobs = action.payload.user.Jobs;
            newState.saved_jobs = action.payload.user.Save_for_Laters;
            newState.applications = action.payload.user.Applications;
            const new_updated_user = newState.users.find(user => user.id === action.payload.user.id);
            if (new_updated_user) {
                newState.users.splice(newState.users.indexOf(new_updated_user), 1, action.payload.user);
            } else {
                newState.users.push(action.payload.user);
            }
            return newState;
        case SEARCH_DATA:
            // , ...action.payload.companyResults
            newState.search = [...action.payload.jobResults, ...action.payload.userResults ];
            // newState.jobs.push(...action.payload.jobResults);
            return newState;
        case USER_PAGE:
            const user = newState.users.find(user => user.id === action.payload.user.id);
            if (!user) {
                newState.users.push(action.payload.user);
            } else {
                newState.users.splice(newState.users.indexOf(user), 1, action.payload.user);
            }
            return newState;
        case EDIT_PROFILE:
            const editor = newState.users.find(user => user.id === action.payload.newUser.id);
            if (!editor) {
                newState.users.push(action.payload.newUser);
            } else {
                newState.users.splice(newState.users.indexOf(editor), 1, action.payload.newUser);
            }
            return newState;
        case CREATE_POST:
            newState.posts.push(action.payload);
            return newState;
        case EDIT_POST:
            const post = newState.posts.find(post => post.id === action.payload.newPost.id);
            newState.posts.splice(newState.posts.indexOf(post), 1, action.payload.newPost);
            return newState;
        case DELETE_POST:
            const deleteMe = newState.posts.find(post => post.id === +action.payload);
            newState.posts.splice(newState.posts.indexOf(deleteMe), 1, {message: 'This post has been removed'});
            return newState;
        case CREATE_JOB:
            newState.jobs.push(action.payload.newJob);
            const person = newState.users.find(person => person.id === +action.payload.newJob.poster_id);
            if (person.Jobs) {
                person.Jobs.push(action.payload.newJob);
            }
            return newState;
        case UPDATE_JOB:
            const update_job = newState.jobs.find(job => job.id === action.payload.updated_job.id);
            if (update_job) {
                newState.jobs.splice(newState.jobs.indexOf(update_job), 1, action.payload.updated_job);
            } 
            const replace_user = newState.users.find(user => user.id === action.payload.user.id);
            if (replace_user) {
                newState.users.splice(newState.users.indexOf(replace_user), 1, action.payload.user);
            }
            return newState;
        case DELETE_JOB:
            const delete_job = newState.jobs.find(job => job.id === +action.payload.job_id);
            newState.jobs.splice(newState.jobs.indexOf(delete_job), 1, {message: 'This post has been removed'});
            const user_with_job = newState.users.find(user => user.id === +action.payload.userId);
            if (user_with_job) {
                const remove_job = user_with_job.Jobs.find(job => job.id === +action.payload.job_id);
                user_with_job.Jobs.splice(user_with_job.Jobs.indexOf(remove_job), 1, {message: 'This post has been removed'});
            }
            return newState;
        case LIKE_POST:
            const liked = newState.posts.find(post => post.id === +action.payload.post.id);
            newState.posts.splice(newState.posts.indexOf(liked), 1, action.payload.post)
            return newState;
        case ADD_COMMENT:
            const commentPost = newState.posts.find(post => post.id === action.payload.newPost.id);
            newState.posts.splice(newState.posts.indexOf(commentPost), 1, action.payload.newPost);
            return newState;
        case LIKE_COMMENT:
            const post_like = newState.posts.find(post => post.id === +action.payload.post.id);
            newState.posts.splice(newState.posts.indexOf(post_like), 1, action.payload.post);
            return newState;
        case EDIT_COMMENT:
            const findPost = newState.posts.find(post => post.id === action.payload.newPost.id);
            newState.posts.splice(newState.posts.indexOf(findPost), 1, action.payload.newPost);
            return newState;
        case DELETE_COMMENT:
            const post_with_comment = newState.posts.find(post => post.id === +action.payload.post_id);
            const delete_comment = post_with_comment.Comments.find(comment => comment.id === +action.payload.comment_id);
            post_with_comment.Comments.splice(post_with_comment.Comments.indexOf(delete_comment), 1, { message: 'This comment has been removed'})
            return newState;
        case APPLY_TO_JOB:
            // const replace_job = newState.jobs?.find(job => job.id === action.payload.job.id);
            // if (replace_job) {
            //     newState.jobs.splice(newState.jobs.indexOf(replace_job), 1, action.payload.job);
            // } else {
            //     newState.jobs.push(action.payload.job);
            // }
            const replace_search = newState.search.find(job => job.id === action.payload.job.id);
            if (replace_search) {
                newState.search.splice(newState.search.indexOf(replace_search), 1, action.payload.job);
            }
            newState.applications.push(action.payload.job);
            return newState;
        case DELETE_APP:
            const delete_app = newState.applications.find(app => app.id === +action.payload.id);
            newState.applications.splice(newState.applications.indexOf(delete_app), 1);
            return newState;
        case SAVE_JOB:
            newState.saved_jobs.push(action.payload.newSave);
            return newState;
        case DELETE_SAVE: 
            const saver = newState.saved_jobs.find(save => save.id === +action.payload.id);
            newState.saved_jobs.splice(newState.saved_jobs.indexOf(saver), 1);
            return newState;
        case GET_RECENT_JOBS:
            newState.recent_jobs = action.payload.jobs;
            return newState;
        case GET_TASKS:
            newState.tasks = action.payload.tasks;
            return newState;
        case CREATE_TASK:
            newState.tasks.push(action.payload.newTask);
            return newState;
        case DELETE_TASK:
            const delete_task = newState.tasks.find(task => task.id === +action.payload.id);
            newState.tasks.splice(newState.tasks.indexOf(delete_task), 1);
            return newState;
        default: 
            return state;
    }
}

export default data_reducer;