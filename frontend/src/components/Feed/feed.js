import { useDispatch, useSelector } from 'react-redux';

import './feed.css';

function Feed() {

    const user = useSelector(state => state.session.user);

    return (
        <div id='feed-main'>
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
            <div className='card-container'>
                <div className='left-cards'>
                    <div className='profile-card'>
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
                    <div className='team-card'>
                        <h1>Teams and info</h1>
                    </div>
                </div>
                <div className='right-cards'>
                    <div className='options-toggle'>
                        <button>options</button>
                    </div>
                    <div className='messages'>
                        <h1>Messages</h1>
                    </div>
                </div>
            </div>
            <div className='feed'>
                <h1>feed</h1>
            </div>
        </div>
    )
}

export default Feed;