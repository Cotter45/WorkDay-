import { useSelector, useDispatch } from 'react-redux';
import EditPostModal from '../EditPostModal';

function Posts({ posts }) {
    const user = useSelector(state => state.session.user);

    return (
        <>
        {posts && posts.map(post => (
            <div key={post.id} className='feed-post'>
                <div className='post-user-container'>
                    <div id='post-user'>
                        <img className='post-image' src={post.User.profile_picture} alt='poster'></img>
                        <div className='post-user-info'>
                            <p>{post.User.first_name + ' ' + post.User.last_name}</p>
                            <p>{post.Company?.name}</p>
                            <h6>{post.User.current_job}</h6>
                        </div>
                    </div>
                    {post.poster_id === user.id && (
                        <EditPostModal post={post} />
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
                <div className='likes-comments'>
                    <p>{post.Likes.length} <i className="far fa-thumbs-up" /> - {post.Comments.length} comments</p>
                </div>
                <div className='feed-buttons'>
                    <button>Like</button>
                    <button>Comment</button>
                </div>
            </div>
        ))}
        </>
    )
}

export default Posts;