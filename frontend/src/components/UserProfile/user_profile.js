import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams, Switch, Route, useHistory } from 'react-router-dom';

import { get_user_data } from '../../store/api';

import './profile.css';
import Posts from '../Posts/posts';
import Jobs from '../Jobs/jobs';
import EditProfileModal from '../EditProfileModal';
import ToDo from './to-dos/todo';
import Photos from './userPhotos/photos';

function UserProfile() {
    const dispatch = useDispatch();
    const userId = useParams().id;
    const history = useHistory();

    const user = useSelector(state => state.data.users.find(user => user.id === +userId));
    // const [user, setUser] = useState(stateUsers.find(user => user.id === +userId));
    const posts = useSelector(state => state.data.posts)?.filter(post => post.poster_id === +userId);
    const me = useSelector(state => state.session.user);

    // const [posts, setPosts] = useState('');
    const [update, setUpdate] = useState(false);
    const [userUpdate, setUserUpdate] = useState(false);
    const [showJob, setShowJob] = useState(false);
    const [showPost, setShowPost] = useState(true);
    const [tasks, setShowTasks] = useState(false);
    const [photos, setShowPhotos] = useState(false);
    const [edit, setEdit] = useState(false);
    // const [profileUpdate, setProfileUpdate] = useState(false);

    // useEffect(() => {
    //     if (!profileUpdate) return;

    //     setUser(stateUsers.find(user => user.id === +userId));
    // }, [user, userId])

    // useEffect(() => {
    //     if (user) return;
    //     history.push('')
    // })

    useEffect(() => {
        if (!userId) return;
        if (!me) return;
        if (+userId === me.id) {
            setShowJob(false)
            setShowPost(true)
        }
    }, [me, userId])

    useEffect(() => {
        if (userUpdate) return;

        (async function sendIt() {
            await dispatch(get_user_data(userId));
        })()
        setUserUpdate(!userUpdate);
    }, [dispatch, user, userId, userUpdate])

    useEffect(() => {
        if (user) return;
        (async function sendIt() {
            await dispatch(get_user_data(userId));
        })()
    }, [dispatch, user, userId])


    // useEffect(() => {
    //     if (!posts) return;
    //     if (posts.length && posts[0].poster_id === +userId) return;
    //     setPosts(user?.id === me?.id ? statePosts : user?.Posts);
    // }, [me?.id, posts, statePosts, user, userId])


    // useEffect(() => {
    //     if (!update) return;
    //     (async function sendIt() {
    //         await dispatch(get_user_data(userId));
    //     })()
    //     // setUser(stateUsers.find(user => user.id === +userId))
    //     setPosts(user?.id === me?.id ? statePosts : user?.Posts);
    //     setUpdate(!update);
    // }, [user?.Posts, update, dispatch, userId, user?.id, me?.id, statePosts])


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
                        {me.id === +userId && (
                            <EditProfileModal update={update} setUpdate={setUpdate} user={user} />
                        )}
                        {me && edit && (
                            <>
                                <button className='edit-account'><i className="fas fa-check fa-2x"></i></button>
                                <button className='edit-account' onClick={() => setEdit(!edit)}><i className="fas fa-times fa-2x"></i></button>
                            </>
                        )}
                    </div>
                    <div className='router'>
                        <div className='router-links'>
                            <button onClick={() => {
                                setShowJob(false)
                                setShowPost(!showPost)
                                setShowTasks(false)
                                setShowPhotos(false)
                            }} className='post-button'>Posts</button>
                            <button onClick={() => {
                                setShowPost(false)
                                setShowJob(!showJob)
                                setShowTasks(false)
                                setShowPhotos(false)
                            }} className='post-button'>Job Posts</button>
                            {+userId === me.id && (
                                <button onClick={() => {
                                    setShowPost(false)
                                    setShowJob(false)
                                    setShowTasks(!tasks)
                                    setShowPhotos(false)
                                }} className='post-button'>To-Do</button>
                            )}
                            <button onClick={() => {
                                setShowPost(false)
                                setShowJob(false)
                                setShowTasks(false)
                                setShowPhotos(!photos)
                            }} className='post-button'>Photos</button>
                            {/* <Link to={`/profile/${userId}/posts`}>Posts</Link> */}
                            {/* <Link to={`/profile/${userId}/job_posts`}>Job Posts</Link> */}
                        </div>

                    {posts && showPost && (
                        <Posts update={update} setUpdate={setUpdate} posts={posts} />
                    )}
                    {showJob && (
                        <Jobs user={user} />
                    )}
                    {tasks && (
                        <ToDo tasks={user.Tasks} />
                    )}
                    {photos && (
                        <Photos />
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