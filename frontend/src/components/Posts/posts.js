import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import EditPostModal from '../EditPostModal';

function Posts({ posts, modal, setUpdate, update }) {
    const history = useHistory();

    const user = useSelector(state => state.session.user);


    return (
        <>
        {posts && posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, index) => (
            <div className='profile-feed-post' key={post.message ? index : post.id}>
            {!post.message && (
                <div key={post.id} className='feed-post'>
                    <div className='post-user-container'>
                        <div onClick={() => history.push(`/profile/${post.User.id}/posts`)} id='post-user'>
                            <img className='post-image' src={post.User.profile_picture} alt='poster'></img>
                            <div className='post-user-info'>
                                <p>{post.User.first_name + ' ' + post.User.last_name}</p>
                                <p>{post.Company?.name}</p>
                                <p>{new Date(post.createdAt).toDateString()} {new Date(post.createdAt).toLocaleTimeString()}</p>
                                <h6>{post.User.current_job}</h6>
                            </div>
                        </div>
                        {!modal && post.poster_id === user.id && (
                            <EditPostModal update={update} setUpdate={setUpdate} post={post} />
                        )}
                    </div>
                    <div className='post-text'>
                        <p>{post.description}</p>
                    </div>
                    <div className='post-images'>
                        {post.image_url && (
                            <img className='feed-image' alt='post' src={post.image_url}></img>
                        )}
                    </div>
                    {!modal && (
                        <>
                        <div className='likes-comments'>
                            <p>{post.Likes.length} <i className="far fa-thumbs-up" /> - {post.Comments.length} comments</p>
                        </div>
                        <div className='feed-buttons'>
                            <button>Like</button>
                            <button>Comment</button>
                        </div>
                        </>
                    )}
                </div>
            )}
            {post.message && (
                <p key={index}>{post.message}</p>
            )}
            </div>
        ))}
        </>
    )
}

export default Posts;