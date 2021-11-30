import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create_task } from '../../../../store/api';

import './create_task.css';


function CreateTask({ tasks, setShowModal, setTasks, taskCards }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(1);
    const [description, setDescription] = useState('');
    const [position, setPosition] = useState(tasks.length + 1);
    const [requirement, setRequirement] = useState('');
    const [requirements, setRequirements] = useState([]);
    const [url, setUrl] = useState('');
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const root = document.getElementById('root');
        const html = document.querySelector('html');
        const body = document.querySelector('body');
        root.style.overflow = 'hidden';
        root.style.height = '80%';
        html.style.overflow = 'hidden';
        html.style.height = '80%';
        body.style.overflow = 'hidden';
        body.style.height = '80%';

        return () => {
            root.style.overflow = null;
            root.style.height = 'fit-content';
            html.style.overflow = null;
            html.style.height = 'fit-content';
            body.style.overflow = null;
            body.style.height = 'fit-content';
        }
    })

    useEffect(() => {
        let errs  = [];

        if (!errors.find(err => err.title)) {
            if (title && title.length > 254) errs.push({ title: 'Title must be less than 255 characters'} )
        }

        setErrors([...errors, ...errs])
        errs = [];

    }, [title])

    const handleURL = (e) => {
        if (!url.includes('http') || !url.includes('https')) {
            setErrors([...errors, { image: 'URL is not valid' } ])
        } else {
            setImages([...images, url]);
            setUrl('');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imagesToUpload = images.filter(image => image.name);
        const imageLinks = images.filter(image => !image.name);

        const task = {
            title,
            priority: priority >= 1 && priority < 2 ? 1 : priority >= 2 && priority < 3 ? 2 : 3,
            description,
            position,
            requirements,
            imagesToUpload,
            imageLinks,
            userId: user.id
        }

        const newTask = await dispatch(create_task(task));
        console.log(newTask);
        setTasks([...taskCards, newTask.task]);
        setShowModal(false);
    }

    return (
        <div className='create_task_modal'>
            <h1>New Task</h1>
            <form className='create_task_form' onSubmit={handleSubmit}>
                <div className='create_task_left'>
                    <label>Title {title && <label className='error'> - {255 - title.length}</label>}</label>
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors.map((errs, index) => errs.title && <label key={index} className='error'>{errs.title}</label>)}
                    <label>Priority <label className={priority >= 1 && priority < 2 ? 'priority-low' : priority >= 2 && priority < 3 ? 'priority-medium' : 'priority-high'}>{priority >= 1 && priority < 2 ? ' - low' : priority >= 2 && priority < 3 ? ' - medium' : ' - high'}</label></label>
                    <input className={priority >= 1 && priority < 2 ? 'low' : priority >= 2 && priority < 3 ? 'medium' : 'high'} type='range' value={priority} min={1} max={3} step={.1} onChange={(e) => setPriority(+e.target.value)} />
                    <label>Description</label>
                    <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>Add Requirements</label>
                    <div className='task_requirements'>
                        <input type='text' value={requirement} onChange={(e) => setRequirement(e.target.value)} />
                        <button type='button' onClick={(e) => {
                            e.preventDefault();
                            if (requirement) {
                                setRequirements([...requirements, requirement])
                                setRequirement('');
                            }
                        }} className='post-button'><i className='fas fa-plus'></i></button>
                    </div>
                </div>
                <div className='create_task_right'>
                    <label>Requirements</label>
                    <ol className='requirements_list'>
                        {requirements?.map((requirement, index) => (
                            <div className='edit-requirements' key={index}>
                                <li>{requirement}</li>
                                <button 
                                    type='button'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setRequirements(requirements.filter(req => req !== requirement))
                                    }}
                                    className='post-button'>
                                    <i className="far fa-trash-alt" /></button>
                            </div>
                        ))}
                    </ol>
                    <div className='task_images'>
                        <label>Images</label>
                        <div className='edit-buttons'>
                            <label>URL</label>
                            <input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onFocus={() => setErrors([])}
                                className='post-image-input'
                            ></input>
                            {!url && (
                                <>
                                <label>OR</label>
                                <label className='upload'>
                                    <input
                                        type='file'
                                        className='upload-button'
                                        onChange={(e) => e.target.files[0] ? setImages([...images, e.target.files[0]]) : null} 
                                        ></input>
                                    Choose File
                                </label>
                                </>
                            )}
                            {url && (
                                <button className='submit' onClick={handleURL}>Add</button>
                            )}
                        </div>
                        {errors.map((err, index) => err.image && <p key={index} className='error'>{err.image}</p>)}
                        <div className='task_images_preview'>
                            {images.map((image, index) => (
                                <div className='task_image' key={index}>
                                    <button onClick={() => setImages(images.filter((_image, _index) => _index !== index))}>X</button>
                                    <img src={image?.name ? URL.createObjectURL(image) : image} alt='task_image' />
                                </div>
                            ))}
                        </div>
                    </div>      
                </div>
            </form>
            <div className='edit-post-buttons'>
                <button className='submit' onClick={handleSubmit}>Create</button>
                <button className='delete' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateTask;