import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams, Switch, Route } from 'react-router-dom';

import { get_user_data } from '../../store/api';

import './profile.css';
import Posts from '../Posts/posts';
import Jobs from '../Jobs/jobs';

function UserProfile() {
    const dispatch = useDispatch();
    const userId = useParams().id;

    const user = useSelector(state => state.data.users.find(user => user.id === +userId));
    const statePosts = useSelector(state => state.data.posts)?.filter(post => post?.poster_id === user?.id);
    const me = useSelector(state => state.session.user);

    // const [jobs, setJobs] = useState(user?.Jobs);
    const [posts, setPosts] = useState(user?.id === me?.id ? statePosts : user?.Posts);
    // const [jobUpdate, setJobUpdate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [userUpdate, setUserUpdate] = useState(false);
    const [showJob, setShowJob] = useState(false);
    const [showPost, setShowPost] = useState(true);


    useEffect(() => {
        if (userUpdate) return;

        (async function sendIt() {
            await dispatch(get_user_data(userId));
        })()

        setUserUpdate(!userUpdate);
    }, [dispatch, user, userId, userUpdate])

    // useEffect(() => {
    //     if (jobs) return;
    //     setJobs(user?.Jobs);
    // }, [jobs, user])

    useEffect(() => {
        if (posts) return;
        setPosts(user?.id === me?.id ? statePosts : user?.Posts);
    }, [me?.id, posts, statePosts, user])

    // useEffect(() => {
    //     if (!jobUpdate) return;
    //     setJobs(user?.Jobs)
    // }, [jobUpdate, user?.Jobs])

    useEffect(() => {
        if (!update) return;
        (async function sendIt() {
            await dispatch(get_user_data(userId));
        })()
        setPosts(user?.id === me?.id ? statePosts : user?.Posts);
        setUpdate(!update);
    }, [user?.Posts, update, dispatch, userId, user?.id, me?.id, statePosts])


    
    let myAccount;
    if (user) {
        myAccount = me.id === +userId;
    }


    return (
        <div className='profile-page'>
            {!user && (
                <div className='loading'>Loading...</div>
            )}
            {user && (
                <div className='profile-main'>
                    <div className='profile-header'>
                        <div className='background-image'>
                            <img alt='background' src={user.background_image}></img>
                        </div>
                        <img className='profile-pic' alt='profile' src={user.profile_picture}></img>
                        <div className='profile-page-info'>
                            <div className='light-info'>
                                <p>{user.first_name} {user.last_name}</p>
                                <p>{user.email && user.email}</p>
                                <p>{user.location && user.location}</p>
                                <p>{user.Company?.name}</p>
                                <p>{user.current_job && user.current_job}</p>
                            </div>
                        </div>
                        <div className='profile-description'>
                            <p>{user.description && user.description}</p>
                        </div>
                    </div>
                    <div className='router'>
                        <div className='router-links'>
                            <button onClick={() => {
                                setShowJob(false)
                                setShowPost(!showPost)
                            }} className='post-button'>Posts</button>
                            <button onClick={() => {
                                setShowPost(false)
                                setShowJob(!showJob)
                            }} className='post-button'>Job Posts</button>
                            {/* <Link to={`/profile/${userId}/posts`}>Posts</Link> */}
                            {/* <Link to={`/profile/${userId}/job_posts`}>Job Posts</Link> */}
                        </div>

                    {showPost && (
                        <Posts update={update} setUpdate={setUpdate} posts={posts} />
                    )}
                    {showJob && (
                        <Jobs user={user} />
                    )}
                    </div>
                </div>
            )}
        {/* <Switch>
            <Route exact only path='/profile/:userId/posts'>
                <Posts update={postUpdate} setUpdate={setPostUpdate} posts={posts} />
            </Route>
            <Route exact only path='/profile/:userId/job_posts'>
            </Route>
        </Switch> */}
        </div>
    )
}

export default UserProfile;