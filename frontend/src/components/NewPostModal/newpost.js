import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { create_post } from '../../store/api';


function NewPost({ user, disabled, setShowModal, update, setUpdate, showModal }) {
    const dispatch = useDispatch();

    const [addPhoto, setAddPhoto] = useState(false);
    const [addImage, setAddImage] = useState(false);
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');

    const newPost = true;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post = {
            description,
            image_url: photo,
            poster_id: user.id,
            company_id: user.current_company
        }

        await dispatch(create_post(post));
        setUpdate(!update);
        setShowModal(false);
    }


    return (
        <>
        <div className={showModal ? 'new-post' : 'post'}>
            <form onSubmit={handleSubmit} className='post-form'>
                <div className='post-input'>
                    {user && (<img className='post-image' src={user.profile_picture} alt='me'></img>)}
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={disabled}
                        placeholder='Start a post'
                    ></input>
                </div>
            </form>
            {!disabled && (
                <>
                <button className='close-modal' onClick={() => setShowModal(false)}><i className="fas fa-times fa-2x" /></button>
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
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                className='post-image-input'
                                ></input>
                        </div>
                    )}
                    {addImage && (
                        <label className='upload'>
                                <input
                                    type='file'
                                    className='upload-button'
                                    onChange={(e) => setPhoto(e.target.files[0])}
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
            <div className='feed-post'>
                <div className='post-text'>
                    <p>{description}</p>
                </div>
                <div className='post-images'>
                    {photo && (
                        <img className='feed-image' alt='post' src={photo}></img>
                    )}
                </div>
            </div>
            <div className='submit-post'>
                <button className='post-button' onClick={handleSubmit}>Submit</button>
            </div>
            </>
            )}
            {disabled && (
                <>
                <div className='post-buttons'>
                    <div className='icons'>
                        <i className="far fa-image fa-2x photo"></i>
                        <p>Photo</p>
                    </div>
                </div>
                </>
            )}
        </div>
        </>
                
    )
}

export default NewPost;