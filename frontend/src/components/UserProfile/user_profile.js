import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams, Switch, Route } from 'react-router-dom';

import { get_user_data } from '../../store/api';

import './profile.css';
import Posts from '../Posts/posts';

function UserProfile() {
    const dispatch = useDispatch();
    const userId = useParams().id;

    const user = useSelector(state => state.data.users.find(user => user.id === +userId));
    const me = useSelector(state => state.session.user);



    
    useEffect(() => {
        if (user) return;

        (async function sendIt() {
            await dispatch(get_user_data(userId));
        })()
    }, [dispatch, user, userId])
    
    let myAccount;
    if (user) {
        myAccount = me.id === +userId;
    }


    return (
        <div className='profile-page'>
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
                            <Link to={`/profile/${userId}/posts`}>Posts</Link>
                            <Link to={`/profile/${userId}/job_posts`}>Job Posts</Link>
                        </div>

                    </div>
                </div>
            )}
        <Switch>
            <Route exact only path='/profile/:userId/posts'>
                <Posts posts={user?.Posts} />
            </Route>
            <Route exact only path='/profile/:userId/job_posts'>

            </Route>
        </Switch>
        </div>
    )
}

export default UserProfile;