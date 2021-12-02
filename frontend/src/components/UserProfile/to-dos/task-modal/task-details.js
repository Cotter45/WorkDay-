import { useSpring } from 'react-spring';
import { useState, useEffect } from 'react';

import './task_details.css';

function TaskDetails({ task, setShowModal }) {

    const [update, setUpdate] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [description, setDescription] = useState(task.description);
    const [requirements, setRequirements] = useState(task.Requirements);
    const [images, setImages] = useState(task.Images);

    console.log(task)

    return <>
    {!update && (
        <div className="task-details">
            <div className='task-buttons'>
                <button onClick={() => setUpdate(!update)}><i className='fas fa-edit'></i></button>
                <button onClick={() => setShowModal(false)}><i className='fas fa-times'></i></button>
            </div>
            <div className='task-header'>
                <div id={priority >= 1 && priority < 2 ? 'low' : priority >= 2 && priority < 3 ? 'medium' : 'high'} ></div>
                <h3>{title}</h3>
            </div>
            <p className='task-date'><strong>Created at:</strong> {new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p className='task-description'><strong>Description: </strong></p>
            <p>{description}</p>
            <p><strong>Requirements:</strong></p>
            <ol>
                {requirements.length > 0 ? requirements.map((requirement) => (
                    <li key={requirement.id}>{requirement}</li>
                )) : <li>No requirements</li>}
            </ol>
            <p><strong>Images:</strong></p>
            <ol>
                {images.length > 0 ? images.map((image) => (
                    <img key={image.id} src={image.imageUrl} alt={'task related upload'}>{image}</img>
                )) : <li>No images uploaded</li>}
            </ol>
        </div>
    )}
    {update && (
        <div className="task-details">
            <div className='task-buttons'>
                <button onClick={() => setUpdate(!update)}><i className='fas fa-check'></i></button>
                <button onClick={() => setShowModal(false)}><i className='fas fa-times'></i></button>
            </div>
            <div className='task-header'>
                <input className={priority >= 1 && priority < 2 ? 'low' : priority >= 2 && priority < 3 ? 'medium' : 'high'} type='range' value={priority} min={1} max={3} step={.1} onChange={(e) => setPriority(+e.target.value)} />
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <p className='task-date'><strong>Created at:</strong> {new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p className='task-description'><strong>Description: </strong></p>
            <textarea className='description-area' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            <p><strong>Requirements:</strong></p>
            <ol>
                {requirements.length > 0 ? requirements.map((requirement) => (
                    <li key={requirement.id}>{requirement}</li>
                )) : <li>No requirements</li>}
            </ol>
            <p><strong>Images:</strong></p>
            <ol>
                {images.length > 0 ? images.map((image) => (
                    <img key={image.id} src={image.imageUrl} alt={'task related upload'}>{image}</img>
                )) : <li>No images uploaded</li>}
            </ol>
        </div>
    )}
    </>;
}

export default TaskDetails;