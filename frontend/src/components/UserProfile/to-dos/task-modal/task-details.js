import { useSpring } from 'react-spring';
import { useState, useEffect } from 'react';

import './task_details.css';

function TaskDetails({ task, setShowModal }) {

    const [update, setUpdate] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);

    console.log(task)

    return (
        <>
        {!update && (
            <div className="task-details">
                <div className='task-buttons'>
                    <button onClick={() => setUpdate(!update)}><i className='fas fa-edit'></i></button>
                    <button onClick={() => setShowModal(false)}><i className='fas fa-times'></i></button>
                </div>
                <div className='task-header'>
                    <div id={priority === 1 ? 'high' : priority === 2 ? 'medium' : 'low'} ></div>
                    <h3>{title}</h3>
                </div>
                <div className='bar'></div>
                <div className='emptybar'></div>
                <div className='filledbar'></div>
                <p className='task-date'><strong>Created at:</strong> {new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
                <p>---</p>
                <p className='task-description'><strong>Description: </strong>{task.description}</p>
            </div>
        )}
        {update && (
            <div className="task-details">
                <div className='task-buttons'>
                    <button onClick={() => setUpdate(!update)}><i className='fas fa-check'></i></button>
                    <button onClick={() => setShowModal(false)}><i className='fas fa-times'></i></button>
                </div>
                <div className='task-header'>
                    <div id={priority === 1 ? 'high' : priority === 2 ? 'medium' : 'low'} ></div>
                    {/* <h3>{task.title}</h3> */}
                    <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='bar'></div>
                <div className='emptybar'></div>
                <div className='filledbar'></div>
                <p className='task-date'><strong>Created at:</strong> {new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
                <p>---</p>
                <p className='task-description'><strong>Description: </strong>{task.description}</p>
            </div>
        )}
        </>
    )
}

export default TaskDetails;