import { useSpring } from 'react-spring';

import './task_details.css';

function TaskDetails({ task, setShowModal }) {

    console.log(task)

    return (
        <div className="task-details">
            <h1>details</h1>
            <h3><div id={task.priority === 1 ? 'high' : task.priority === 2 ? 'medium' : 'low'} ></div>{task.title}</h3>
            <div className='bar'></div>
            <div className='emptybar'></div>
            <div className='filledbar'></div>
            <p className='task-date'>{new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p>---</p>
            <p className='task-description'>{task.description}</p>
        </div>
    )
}

export default TaskDetails;