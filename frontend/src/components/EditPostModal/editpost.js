import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { edit_post, delete_post } from '../../store/api';

import Posts from '../Posts/posts';

import './edit_post.css';

function EditPostForm({ post, setShowModal, setUpdate, update }) {
    const dispatch = useDispatch();

    const [addPhoto, setAddPhoto] = useState(false);
    const [addImage, setAddImage] = useState(false);
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState(post.description);
    const [imageUrl, setImageUrl] = useState(post.image_url ? post.image_url : '');
    const [success, setSuccess] = useState(false);
    const modal = true;

    useEffect(() => {
        if (!description) return;

        let errors = [];
        if (description.length === 0 && !imageUrl) errors.push('Please add some content to post')
        if (description.length > 254) errors.push('Description cannot be longer than 255 characters');
        setErrors(errors);
    }, [description, imageUrl])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (description.length === 0 && !imageUrl) {
            alert('Please add some content to post')
        } else {
            let newPost = {
                description,
                imageUrl
            }
            await dispatch(edit_post(newPost, post.id))
            setUpdate(!update);
            setSuccess(true);
        }
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
            {imageUrl && (
                <img className='feed-image' alt='post' src={imageUrl.name ? URL.createObjectURL(imageUrl) : imageUrl}></img>
            )}
            <div className='post-buttons'>
                {!addImage && (
                    <div onClick={() => setAddPhoto(!addPhoto)} className='icons'>
                        <i className="far fa-image fa-2x photo"></i>
                        <p>URL</p>
                    </div>
                    )}
                {addPhoto && (
                    <div>
                        <input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className='post-image-input'
                            ></input>
                    </div>
                )}
                {addImage && (
                    <label className='upload'>
                            <input
                                type='file'
                                className='upload-button'
                                onChange={(e) => setImageUrl(e.target.files[0])}
                                ></input>
                            Choose File
                        </label>
                )}
                {!addPhoto && (
                    <div onClick={() => setAddImage(!addImage)} className='icons'>
                        <i className="far fa-image fa-2x photo"></i>
                        <p>UPLOAD</p>
                    </div>
                    )}
            </div>
            {/* <label>Image Url</label>
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
                </label> */}
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