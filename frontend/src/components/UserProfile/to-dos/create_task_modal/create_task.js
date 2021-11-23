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
        const url = e.target.value;
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
                    <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>Requrements</label>
                    <input type='text' value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                    <div className='edit-buttons'>
                        <label>URL</label>
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className='post-image-input'
                        ></input>
                        <label>OR</label>
                        <label className='upload'>
                            <input
                                type='file'
                                className='upload-button'
                                onChange={(e) => setImages([...images, e.target.files[0]])}
                                ></input>
                            Choose File
                        </label>
                    </div>
                </div>
                <div className='create_task_right'>
                    <div className='task_images'>
                        <h2>Images</h2>
                        {images.map((image, index) => {
                            return (
                                <div key={index}>
                                    <img src={URL.createObjectURL(image)} alt='task_image' />
                                    <button onClick={() => setImages(images.filter((_image, _index) => _index !== index))}>Remove</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className='task_requirements'>
                        <h2>Requirements</h2>
                    </div>
                </div>
            </form>
            <button className='submit' onCLick={handleSubmit}>Create</button>
        </div>
    )
}

export default CreateTask;