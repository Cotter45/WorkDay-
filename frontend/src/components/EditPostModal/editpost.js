import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { edit_post, delete_post } from '../../store/api';

import Posts from '../Posts/posts';

import './edit_post.css';

function EditPostForm({ post, setShowModal, setUpdate, update }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState(post.description);
    const [imageUrl, setImageUrl] = useState(post.image_url ? post.image_url : '');
    const [success, setSuccess] = useState(false);
    const modal = true;

    useEffect(() => {
        if (!description) return;

        let errors = [];

        if (description.length > 254) errors.push('Description cannot be longer than 255 characters');
        setErrors(errors);
    }, [description])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let newPost = {
            description,
            imageUrl
        }
        await dispatch(edit_post(newPost, post.id))
        setUpdate(!update);
        setSuccess(true);
    }

    const deletePost = async (e) => {
        e.preventDefault();
        await dispatch(delete_post(post.id));
        setUpdate(!update);
        // setSuccess(true);
    }

    return (
        <>
        <button className='close-modal' onClick={() => setShowModal(false)}><i className="fas fa-times fa-2x" /></button>
        <form className='edit-post-form' onSubmit={handleSubmit}>
            {post && (
                <div className='post-edit'>
                    <Posts modal={modal} posts={[post]} />
                </div>
            )}
            <label>Description</label>
            {errors && errors.map(error => (
                <p>{error}</p>
            ))}
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Image Url</label>
            <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            ></input>
            <label>Upload Image</label>
            <label className='upload'>
                Choose File
                <input
                    type='file'
                    className='upload-button'
                    onChange={(e) => setImageUrl(e.target.files[0])}
                >
                </input>
                </label>
        </form>
        {success && (
            <div className='edit-post-buttons'>
                <p>Success!</p>
            </div>
        )}
        <div className='edit-post-buttons'>
            <button onClick={handleSubmit} className='submit' disabled={errors.length ? true : false}>Submit</button>
            <button onClick={deletePost} className='delete'>Delete</button>
        </div>
        </>
    )
}

export default EditPostForm;