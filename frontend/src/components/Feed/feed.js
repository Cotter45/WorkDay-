import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Posts from '../Posts/posts';

import './feed.css';

function Feed() {
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const following = useSelector(state => state.data.following);
    const company = useSelector(state => state.data.company);
    const conversations = useSelector(state => state.data.conversations);
    const posts = useSelector(state => state.data.posts);
    const team = useSelector(state => state.data.team);

    const visitProfile = () => {
        history.push(`/profile/${user.id}/posts`)
    }

    const visitCompany = () => {
        history.push(`/company/${company.id}/posts`)
    }

    return (
        <div id='feed-main'>
            <div className='card-container'>
                <div className='left-cards'>
                    <div onClick={visitProfile} className='profile-card'>
                        <div className='profile-images'>
                            <div className='background-image-container'>
                                <img src={user?.background_image} alt='background'></img>
                            </div>
                            <img className='profile-image' src={user?.profile_picture} alt='me'></img>
                        </div>
                        <div className='profile-info'>
                            <h4>{user?.first_name + ' ' + user?.last_name}</h4>
                            <p>{user?.current_job}</p>
                            <div className='profile-extra-info'>
                                <h4>Location</h4>
                                <p>{user?.location}</p>
                                <h4>Email</h4>
                                <p>{user?.email}</p>
                                <h4>Birthday</h4>
                                <p>{user && new Date(user.birthday).toDateString()}</p>
                                <h4>About</h4>
                                <p>{user?.description}</p>
                            </div>
                        </div>
                    </div>
                    {company && (
                        <div className='team-card'>
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
                    )}
                </div>
                <div className='right-cards'>
                    <div className='messages'>
                        <div className='message-header'>
                            <div className='message-header-left'>
                                <img className='message-user-pic' src={user?.profile_picture} alt='me'></img>
                                <h4>Messaging</h4>
                            </div>
                            <div>
                                <button className='trash-message'><i className="far fa-edit" /></button>
                            </div>
                        </div>
                        {conversations && conversations.map(conversation => (
                            <div key={conversation.id} className='conversation'>
                                {conversation.Users && conversation.Users.filter(talker => talker.id !== user.id).map(user => (
                                    <div key={user.id} className='conversation-user'>
                                        <img className='message-user-pic' src={user.profile_picture} alt='people'></img>
                                        <p>{user.first_name}</p>
                                        <p>-</p>
                                    </div>
                                ))}
                                {/* <button className='trash-message'><i className="far fa-trash-alt" /></button> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='feed'>
                <div className='post'>
                <form className='post-form'>
                    <div className='post-input'>
                        {user && (<img className='post-image' src={user.profile_picture} alt='me'></img>)}
                        <input
                            placeholder='Start a post'
                        ></input>
                    </div>
                    <div className='post-buttons'>
                        <button>Photo</button>
                        <button>Video</button>
                    </div>
                </form>
            </div>
                {posts && (
                    <Posts posts={posts} />
                )}
                <p>That's all for now folks...</p>
            </div>
        </div>
    )
}

export default Feed;