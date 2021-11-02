import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { edit_profile } from '../../store/api';

import UserProfile from "../UserProfile/user_profile";
import { get_data } from '../../store/api';
import * as sessionActions from '../../store/session';

import './edit-profile.css';

function EditProfile({ setShowModal, showModal, user, setUpdate, update, setEditProfile }) {
    const dispatch = useDispatch();

    console.log('PROFILE')

    const [background_image, setBackgroundImage] = useState(user.background_image);
    const [profile_picture, setProfilePicture] = useState(user.profile_picture);
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [location, setLocation] = useState(user.location || '');
    const [company, setCompany] = useState(user.Company?.name ? user.Company.name : '');
    const [current_job, setCurrentJob] = useState(user.current_job || '');
    const [description, setDescription] = useState(user.description || '');

    const [addPhoto, setAddPhoto] = useState(false);
    const [addImage, setAddImage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            background_image,
            profile_picture,
            first_name,
            last_name,
            email,
            location,
            current_job,
            description
        }
        // company,
        await dispatch(edit_profile(newUser, user.id));
        await dispatch(sessionActions.restoreUser());
        await dispatch(get_data(user.id))
        if (setEditProfile) {
            setEditProfile(false);
        }
        // setUpdate(!update);
        setShowModal(!showModal);
        
    }

    return (
        <div className='edit-profile-modal'>
            <form onSubmit={handleSubmit} className='edit-profile-form'>
                <div className='profile-light'>
                    <div className='edit-background-image'>
                        <label>Background Image</label>
                        <img alt='background' src={background_image.name ? URL.createObjectURL(background_image) : background_image}></img>
                        <div className='edit-buttons'>
                            <label>URL</label>
                            <input
                                value={background_image.name ? 'Upload' : background_image}
                                onChange={(e) => setBackgroundImage(e.target.value)}
                                className='post-image-input'
                            ></input>
                            <label>OR</label>
                            <label className='upload'>
                                <input
                                    type='file'
                                    className='upload-button'
                                    onChange={(e) => setBackgroundImage(e.target.files[0])}
                                    ></input>
                                Choose File
                            </label>
                        </div>
                    </div>
                    <div className='edit-profile-image'>
                        <label>Profile Picture</label>
                        <img className='edit-profile-pic' alt='profile' src={profile_picture.name ? URL.createObjectURL(profile_picture) : profile_picture}></img>
                        <div className='edit-buttons'> 
                            <label>URL</label>
                            <input
                                value={profile_picture.name ? 'Upload' : profile_picture}
                                onChange={(e) => setProfilePicture(e.target.value)}
                                className='post-image-input'
                                ></input>
                            <label>OR</label>
                            <label className='upload'>
                                <input
                                    type='file'
                                    className='upload-button'
                                    onChange={(e) => setProfilePicture(e.target.files[0])}
                                    ></input>
                                Choose File
                            </label>
                        </div>
                    </div>
                    <div className='edit-profile-page-info'>
                        <div className='edit-light-info'>
                            <label>First Name
                                <input 
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                ></input>
                            </label>
                            <label>Last Name
                                <input 
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                ></input>
                            </label>
                            <label>Email
                                <input  
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </label>
                            <label>Location
                                <input  
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                ></input>
                            </label>
                            <label>Company
                                <input
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                ></input>
                            </label>
                            <label>Current Job
                                <input 
                                    value={current_job}
                                    onChange={(e) => setCurrentJob(e.target.value)}
                                ></input>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='profile-light-description'>
                    <label>Description</label>
                    <textarea   
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    
                </div>
            </form>
            <div className='edit-buttons'>
                <button className='edit-button' onClick={handleSubmit}><i className="fas fa-check fa-2x"></i></button>
                <button className='edit-button' onClick={() => {
                    setEditProfile(false);
                    setShowModal(!showModal);
                }}><i className="fas fa-times fa-2x"></i></button>
            </div>
        </div>
    )
}

export default EditProfile;