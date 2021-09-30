import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


import Posts from '../Posts/posts';

import './feed.css';
import { get_data } from '../../store/api';
import NewPost from '../NewPostModal/newpost';
import NewPostModal from '../NewPostModal';
import ProfileCard from './profile-card';

function Feed() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const following = useSelector(state => state.data.following);
    const company = useSelector(state => state.data.company);
    const conversations = useSelector(state => state.data.conversations);
    const posts = useSelector(state => state.data.posts);
    const team = useSelector(state => state.data.team);

    const [update, setUpdate] = useState(false);
    // const [posts, setPosts] = useState(statePosts);
    // const [addPhoto, setAddPhoto] = useState(false);
    // const [addImage, setAddImage] = useState(false);
    // const [photo, setPhoto] = useState('');

    // useEffect(() => {
    //     if (posts) return;

    //     setPosts(statePosts);
    // }, [posts, statePosts])

    // useEffect(() => {
    //     if(!update) return;

    //     setPosts(statePosts);
    //     setUpdate(false);
    // }, [statePosts, update])

    const visitProfile = () => {
        history.push(`/profile/${user.id}`)
    }

    const visitCompany = () => {
        history.push(`/company/${company.id}`)
    }

    return (
        <>
        {!posts && (
                <div className='loading'>Loading...</div>
            )}
        <div id='feed-main'>
            <div className='container'>
                {/* <div className='card-container'> */}
                    <div className='left-cards'>
                        <ProfileCard visitProfile={visitProfile} user={user} />
                        {/* {company && (
                            <div onClick={visitCompany} className='team-card'>
                                <div className='profile-images'>
                                    <div className='background-image-container'>
                                        <img className='company-background' src={company?.background_image} alt='background'></img>
                                    </div>
                                    <img className='profile-image' src={company?.profile_picture} alt='me'></img>
                                </div>
                                <div>
                                    <h4>{company.name}</h4>
                                    <p>{company.email}</p>
                                    <h4>{team.name}</h4>
                                    <p>{team.Users.length} {team.Users.length > 1 ? 'members' : 'member'}</p>
                                    <p>{team.Projects.length} projects</p>
                                </div>

                            </div>
                        )} */}
                    </div>
                {/* </div> */}
                <div className='feed'>
                    <NewPostModal setUpdate={setUpdate} update={update} user={user} />
                    {posts && (
                        <Posts update={update} setUpdate={setUpdate} posts={posts} />
                    )}
                    <p>That's all for now folks...</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Feed;


{/* <div className='right-cards'>
    <div className='messages'>
        <div className='message-header'>
            <div className='message-header-left'>
                <img className='message-user-pic' src={user?.profile_picture} alt='me'></img>
                <h4>Messaging</h4>
            </div>
            <div>
                <button className='trash-message'><i className="far fa-edit" /></button>
            </div>
        </div> */}
        // {conversations && conversations.map(conversation => (
            // <div key={conversation.id} className='conversation'>
                // {conversation.Users && conversation.Users.filter(talker => talker.id !== user.id).map(user => (
                //     <div key={user.id} className='conversation-user'>
                //         <img className='message-user-pic' src={user.profile_picture} alt='people'></img>
                //         <p>{user.first_name}</p>
                //         <p>-</p>
                //     </div>
                // ))}
                {/* <button className='trash-message'><i className="far fa-trash-alt" /></button> */}
//             </div>
//         ))}
//     </div>
// </div>