import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


import './comments.css';
import { add_comment, delete_comment, edit_comment, like_comment } from '../../store/api';
import NewComment from './newcomment';
import EditComment from './editcomment';

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

    // useEffect(() => {
    //     const topOfComments = document.querySelector('.comments-container');
    //     if (topOfComments) {
    //         topOfComments.scrollIntoView({top: -100, behavior: 'smooth', block: 'start' });
    //     }
    // }, [comments])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment.length > 254) {
            alert('Comment must be less than 255 characters')
        } else if (comment.length === 0 && !photo) {
            alert('Please add some content to comment')
        } else {
            const newComment = {
                comment: comment ? comment : '',
                image_url: photo ? photo : '',
                user_id: user.id
            }
            await dispatch(add_comment(newComment, post.id));
            setComment('');
            setPhoto('');
            setUpdate(!update)
        }

    }

    const handleLikeComment = async (e, comment_id) => {
        e.preventDefault();

        const data = {
            user_id: user.id,
            comment_id,
            post_id: post.id 
        }
        await dispatch(like_comment(data));
        setUpdate(!update)
    }

    const handleEditComment = async (e, comment_id) => {
        e.preventDefault();
        // const comments = document.getElementById(`${comment_id}`);
        // comments.scrollIntoView({ behavior: 'smooth' });

        if (newComment.length > 254) {
            alert('Comment must be less than 255 characters')
        } else if (newComment.length === 0 && !photo) {
            alert('Please add some content to comment')
        } else {
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
    }

    const handleDeleteComment = async (e, comment_id) => {
        e.preventDefault();

        await dispatch(delete_comment(comment_id));
        setUpdate(!update);
        setEdit(!edit);
        setEditComment('');
        setPhoto('');
        setNewComment('');
    }

    return (
        <div className='comments-container'>
            <NewComment 
                handleSubmit={handleSubmit}
                comment={comment}
                setComment={setComment}
                edit={edit}
                addImage={addImage}
                setAddImage={setAddImage}
                setAddPhoto={setAddPhoto}
                addPhoto={addPhoto}
                user={user}
                setPhoto={setPhoto}
                photo={photo} />
            {/* {!edit && photo && (
            <img className='post-comment-image' alt='post' src={photo.name ? URL.createObjectURL(photo) : photo}></img>
            )} */}
            {length && comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(comment => (
                <div key={!comment.message ? comment.id : uuidv4()} id={comment.id} className='comment-container'>
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
                                    setPhoto('')
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
                            <EditComment 
                                handleEditComment={handleEditComment}
                                comment={comment}
                                newComment={newComment}
                                setNewComment={setNewComment}
                                edit={edit}
                                photo={photo}
                                editComment={editComment}
                                addImage={addImage}
                                setAddPhoto={setAddPhoto}
                                addPhoto={addPhoto}
                                setPhoto={setPhoto}
                                setAddImage={setAddImage} />
                        )}
                    </div>
                    <div className='comment-buttons'>
                        <button onClick={(e) => handleLikeComment(e, comment.id)}>Like</button>
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