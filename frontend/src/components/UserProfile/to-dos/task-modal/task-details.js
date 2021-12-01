import { useSpring } from 'react-spring';

import './task_details.css';

function TaskDetails({ task, setShowModal }) {

    console.log(task)

    return (
        <div className="task-details">
            <div className='task-header'>
                <div id={task.priority === 1 ? 'high' : task.priority === 2 ? 'medium' : 'low'} ></div>
                <h3>{task.title}</h3>
            </div>
            <div className='bar'></div>
            <div className='emptybar'></div>
            <div className='filledbar'></div>
            <p className='task-date'><strong>Created at:</strong> {new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p>---</p>
            <p className='task-description'><strong>Description: </strong>{task.description}</p>
        </div>
    )
}

export default TaskDetails;