import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


import './comments.css';
import { add_comment, delete_comment, edit_comment } from '../../store/api';

function Comments({ post, update, setUpdate }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const comments = post.Comments;
    const length = comments.length > 0;

    const user = useSelector(state => state.session.user);

    const [comment, setComment] = useState('');
    const [photo, setPhoto] = useState('');
    const [addPhoto, setAddPhoto] = useState(false);
    const [addImage, setAddImage] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editComment, setEditComment] = useState('');
    const [newComment, setNewComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('what')

        const newComment = {
            comment: comment ? comment : null,
            image_url: photo ? photo : null,
            user_id: user.id
        }
        console.log(newComment)
        await dispatch(add_comment(newComment, post.id));
        setComment('');
        setPhoto('');
        setUpdate(!update)
    }

    const handleEditComment = async (e, comment_id) => {
        e.preventDefault();
        console.log(comment_id)
        const comment = {
            comment: newComment,
            image_url: photo,
            user_id: user.id,
            post_id: post.id
        }
        await dispatch(edit_comment(comment, comment_id));
        setUpdate(!update);
        setNewComment('');
        setPhoto('');
        setEdit(!edit);
        setEditComment('');
    }

    const handleDeleteComment = async (e, comment_id) => {
        e.preventDefault();
        console.log(comment_id)

        await dispatch(delete_comment(comment_id));
        setUpdate(!update);
        setEdit(!edit);
        setEditComment('');
        setPhoto('');
        setNewComment('');
    }

    return (
        <div className='comments-container'>
            <form onSubmit={handleSubmit} className='post-comment-form'>
                <div className='post-comment'>
                    <img className='post-comment-image' src={user.profile_picture} alt='user'></img>
                    <input 
                        value={comment ? comment : ''}
                        onChange={(e) => setComment(e.target.value)}
                    ></input>
                </div>
            <div className='post-buttons'>
                    {!edit && !addImage && (
                        <div onClick={() => setAddPhoto(!addPhoto)} className='icons'>
                            <i className="far fa-image fa-2x photo"></i>
                            <p>URL</p>
                        </div>
                        )}
                    {!edit && addPhoto && (
                        <div>
                            <input
                                value={photo ? photo : ''}
                                onChange={(e) => setPhoto(e.target.value)}
                                className='post-image-input'
                                ></input>
                        </div>
                    )}
                    {!edit && addImage && (
                        <label className='upload'>
                                <input
                                    type='file'
                                    className='upload-button'
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    ></input>
                                Choose File
                            </label>
                    )}
                    {!edit && !addPhoto && (
                        <div onClick={() => setAddImage(!addImage)} className='icons'>
                            <i className="far fa-image fa-2x photo"></i>
                            <p>UPLOAD</p>
                        </div>
                        )}
                    <button onClick={handleSubmit} className='post-button'>Submit</button>
                </div>
            </form>
            {length && comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(comment => (
                <div key={!comment.message ? comment.id : uuidv4()} className='comment-container'>
                {comment.message && (
                    <p>{comment.message}</p>
                )}
                {!comment.message && (
                    <>
                    <div className='comment-user-container'>
                        <div className='comment-user'>
                            <img onClick={() => history.push(`/profile/${comment?.User.id}/posts`)}  className='comment-profile-image' src={comment?.User.profile_picture} alt='poster'></img>
                            <div className='comment-user-info'>
                                <p>{comment?.User.first_name + ' ' + comment?.User.last_name}</p>
                                <h6>{comment?.User.current_job}</h6>
                            </div>
                        </div>
                    {comment?.user_id === user.id && (
                        <div className='comment-buttons'>
                            <button onClick={() => {
                                if (editComment === comment.id) {
                                    setNewComment(comment.comment)
                                    setPhoto(comment.image_url)
                                    setEditComment(comment.id)
                                    setEdit(!edit)
                                } else {
                                    setNewComment(comment.comment)
                                    setPhoto(comment.image_url)
                                    setEditComment(comment.id)
                                    setEdit(true)
                                }
                            }}><i className="fas fa-ellipsis-h"></i></button>
                            {editComment === comment.id && edit && (
                                <>
                                <button onClick={(e) => handleDeleteComment(e, comment.id)} className=''><i className="far fa-trash-alt"></i></button>
                                <button onClick={(e) => handleEditComment(e, comment.id)} className=''><i className="fas fa-pencil-alt"></i></button>
                                </>
                            )}
                        </div>
                    )}
                    </div>
                    <div className='comment-section'>
                        <div className='comment'>
                            {comment.comment && (
                                <>
                                <p>{editComment === comment.id && newComment ? newComment : comment.comment}</p>
                                </>
                            )}
                        </div>
                        {comment.image_url && (
                            <img className='comment-image' src={comment.image_url} alt='comment'></img>
                        )}
                        {editComment === comment.id && edit && (
                        <form onSubmit={(e) => handleEditComment(e, comment.id)} className='edit-form'>
                            <input 
                                value={newComment ? newComment : ''}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></input>
                            <div className='post-buttons'>
                                {editComment === comment.id && edit && !addImage && (
                                    <div onClick={() => setAddPhoto(!addPhoto)} className='icons'>
                                        <i className="far fa-image fa-2x photo"></i>
                                        <p>URL</p>
                                    </div>
                                    )}
                                {editComment === comment.id && edit && addPhoto && (
                                    <div>
                                        <input
                                            value={photo ? photo : ''}
                                            onChange={(e) => setPhoto(e.target.value)}
                                            className='post-image-input'
                                            ></input>
                                    </div>
                                )}
                                {editComment === comment.id && edit && addImage && (
                                    <label className='upload'>
                                            <input
                                                type='file'
                                                className='upload-button'
                                                onChange={(e) => setPhoto(e.target.files[0])}
                                                ></input>
                                            Choose File
                                        </label>
                                )}
                                {editComment === comment.id && edit && !addPhoto && (
                                    <div onClick={() => setAddImage(!addImage)} className='icons'>
                                        <i className="far fa-image fa-2x photo"></i>
                                        <p>UPLOAD</p>
                                    </div>
                                    )}
                                <button onClick={(e) => handleEditComment(e, comment.id)} className='post-button'>Submit</button>
                            </div>
                        </form>
                        )}
                    </div>
                    <div className='comment-buttons'>
                        <button onClick={() => alert('DO THIS')}>Like</button>
                        <p> | </p>
                        {comment.Likes && (<p>{comment.Likes.length} likes</p>)}
                    </div>
                </>
                )}
                </div>
            ))}
            {!length && (
                <div className='comment-container'>
                    <p>No comments yet...</p>
                </div>
            )}
        </div>
    )
}

export default Comments;