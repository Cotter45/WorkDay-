import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { delete_image, delete_requirement, update_task, update_task_requirement } from '../../../../store/api';

import './task_details.css';

function TaskDetails({ task, setShowModal, setTasks, tasks }) {
    const dispatch = useDispatch();

    const [update, setUpdate] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [description, setDescription] = useState(task.description);
    const [newReq, setNewReq] = useState(false);
    const [requirement, setRequirement] = useState('');
    const [requirements, setRequirements] = useState(task.Requirements);
    const [images, setImages] = useState(task.Images);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errs  = [];

        if (!errors.find(err => err.title)) {
            if (title && title.length > 254) errs.push({ title: 'Title must be less than 255 characters'} )
        }

        setErrors([...errors, ...errs])
        errs = [];

    }, [title])


    const sendUpdate = async (e) => {
        setUpdate(!update);

        const updatedTask = {
            id: task.id,
            title: title,
            priority: priority >= 1 && priority < 2 ? 1 : priority >= 2 && priority < 3 ? 2 : 3,
            description: description,
        }; 

        const response = await dispatch(update_task(updatedTask));
        setTasks(tasks.map(task => task.id === updatedTask.id ? response : task));
    }

    const addRequirement = async (e) => {
        if (requirement && requirement.length > 254) {
            setErrors([...errors, { requirement: 'Requirement must be less than 255 characters'} ])
        } else {
            const update = await dispatch(update_task_requirement(task.id, requirement));
            setTasks(tasks.map(task => task.id === update.task.id ? update.task : task));
            setRequirements(update.task.Requirements);
            setRequirement('');
        }
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
            <ol className='task-images'>
                {requirements.length > 0 ? requirements.map((requirement) => (
                    <li key={requirement.id}>{requirement.requirement}</li>
                )) : <p>None</p>}
            </ol>
            <p><strong>Images:</strong></p>
            <ol className='task-images'>
                {images.length > 0 ? images.map((image) => (
                    <img className='task-image' key={image.id} src={image.imageUrl} alt={'task related upload'} />
                )) : <p style={{ float: 'left' }}>No images uploaded</p>}
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
                <label>{title && <label className='error'> {255 - title.length}</label>}</label>
            </div>
            <p className='task-date'><strong>Created at:</strong> {new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p><strong>Description: </strong></p>
            <textarea className='description_edit' type='text' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <p><strong>Requirements:</strong> <button onClick={() => setNewReq(!newReq)} className='post-button'>Add New</button></p>
            {newReq && (
                <div>
                    <input onChange={e => setRequirement(e.target.value)} value={requirement} />
                    <button className='post-button' onClick={addRequirement}><i className='fas fa-plus'></i></button>
                    {errors.requirement && <label className='error'>{errors.requirement}</label>}
                </div>
            )}
            <ol className='task-images'>
                {requirements.length > 0 ? requirements.map((requirement) => (
                    <li key={requirement.id}>{requirement.requirement} <button className='post-button' onClick={() => deleteRequirement(requirement.id)}><i className='fas fa-trash'></i></button></li>
                )) : <p>No requirements</p>}
            </ol>
            <p><strong>Images:</strong></p>
            <ol className='task-images'>
                {images.length > 0 ? images.map((image) => (
                    <div key={image.id} className='image_container'>
                        <button className='remove_image' onClick={() => deleteImage(image.id)}><i className='fas fa-trash'></i></button>
                        <img className='task-image' src={image.imageUrl} alt={'task related upload'}></img>
                    </div>
                )) : <p>No images uploaded</p>}
            </ol>
        </div>
    )}
    </>;
}

export default TaskDetails;