import { useState, useEffect } from 'react';

import './create_task.css';


function CreateTask({ tasks }) {

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const[description, setDescription] = useState('');
    const [position, setPosition] = useState(tasks.length + 1);
    const [requirements, setRequirements] = useState('');
    const [url, setUrl] = useState('');
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {

    })

    const handleURL = (e) => {
        setUrl(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className='create_task_modal'>
            <h1>New Task</h1>
            <form className='create_task_form' onSubmit={handleSubmit}>
                <div className='create_task_left'>
                    <label>Title</label>
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label>Priority</label>
                    <input type='text' value={priority} onChange={(e) => setPriority(e.target.value)} />
                    <label>Description</label>
                    <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>Requirements</label>
                    <div className='task_requirements'>
                        <input type='text' value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                        <button>+</button>
                        {}
                    </div>
                </div>
                <div className='create_task_right'>
                    <div className='task_images'>
                        <label>Images</label>
                        <div className='edit-buttons'>
                        <label>URL</label>
                        <input
                            value={url}
                            onChange={(e) => handleURL}
                            className='post-image-input'
                        ></input>
                        <label>OR</label>
                        <label className='upload'>
                            <input
                                type='file'
                                className='upload-button'
                                onChange={(e) => e.target.files[0] ? setImages([...images, e.target.files[0]]) : null} 
                                ></input>
                            Choose File
                        </label>
                    </div>
                    <div className='task_images_preview'>
                        {images.map((image, index) => (
                                <div className='task_image' key={index}>
                                    <button onClick={() => setImages(images.filter((_image, _index) => _index !== index))}>X</button>
                                    <img src={URL.createObjectURL(image)} alt='task_image' />
                                </div>
                        ))}
                    </div>
                    </div>      
                </div>
            </form>
            <button className='submit' onClick={handleSubmit}>Create</button>
        </div>
    )
}

export default CreateTask;