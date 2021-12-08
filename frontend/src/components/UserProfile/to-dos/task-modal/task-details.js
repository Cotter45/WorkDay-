import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { delete_image, delete_requirement } from '../../../../store/api';

import './task_details.css';

function TaskDetails({ task, setShowModal, setTasks, tasks }) {
    const dispatch = useDispatch();

    const [update, setUpdate] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [description, setDescription] = useState(task.description);
    const [requirements, setRequirements] = useState(task.Requirements);
    const [images, setImages] = useState(task.Images);


    const sendUpdate = (e) => {
        setUpdate(!update);
    }

    const deleteRequirement = (id) => {
        dispatch(delete_requirement(id));
        setRequirements(requirements.filter(requirement => requirement.id !== id));
        const newTask = task;
        newTask.Requirements = requirements.filter(requirement => requirement.id !== id);
        setTasks(tasks.map(task => task.id === newTask.id ? newTask : task));
    }

    const deleteImage = (id) => {
        dispatch(delete_image(id));
        setImages(images.filter(image => image.id !== id));
        const newTask = task;
        newTask.Images = images.filter(image => image.id !== id);
        setTasks(tasks.filter(task => task.id === newTask.id ? newTask : task));
    }

    console.log(task)
    return <>
    {!update && (
        <div className="task-details">
            <div className='task-buttons'>
                {!task.completed && (
                    <button onClick={() => setUpdate(!update)}><i className='fas fa-edit'></i></button>
                )}
                <button onClick={() => setShowModal(false)}><i className='fas fa-times'></i></button>
            </div>
            <div className='task-header'>
                <div id={priority >= 1 && priority < 2 ? 'low' : priority >= 2 && priority < 3 ? 'medium' : 'high'} ></div>
                <h3>{title}</h3>
            </div>
            <p className='task-date'><strong>Created at:</strong> {new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p><strong>Description: </strong></p>
            <p className='task-description'>{description}</p>
            <p><strong>Requirements:</strong></p>
            <ol>
                {requirements.length > 0 ? requirements.map((requirement) => (
                    <li key={requirement.id}>{requirement.requirement}</li>
                )) : <li>No requirements</li>}
            </ol>
            <p><strong>Images:</strong></p>
            <ol className='task-images'>
                {images.length > 0 ? images.map((image) => (
                    <img className='task-image' key={image.id} src={image.imageUrl} alt={'task related upload'} />
                )) : <li>No images uploaded</li>}
            </ol>
        </div>
    )}
    {update && (
        <div className="task-details">
            <div className='task-buttons'>
                <button onClick={sendUpdate}><i className='fas fa-check'></i></button>
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
            <p><strong>Description: </strong></p>
            <textarea className='description_edit' type='text' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <p><strong>Requirements:</strong></p>
            <ol>
                {requirements.length > 0 ? requirements.map((requirement) => (
                    <li key={requirement.id}>{requirement.requirement}<button className='delete_req' onClick={() => deleteRequirement(requirement.id)}><i className='fas fa-trash'></i></button></li>
                )) : <li>No requirements</li>}
            </ol>
            <p><strong>Images:</strong></p>
            <ol className='task-images'>
                {images.length > 0 ? images.map((image) => (
                    <div key={image.id} className='image_container'>
                        <button className='remove_image' onClick={() => deleteImage(image.id)}><i className='fas fa-trash'></i></button>
                        <img className='task-image' src={image.imageUrl} alt={'task related upload'}></img>
                    </div>
                )) : <li>No images uploaded</li>}
            </ol>
        </div>
    )}
    </>;
}

export default TaskDetails;