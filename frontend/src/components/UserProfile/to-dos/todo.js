import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../util/loading';

import Task from "./task";
import './to-do.css';

function ToDo({ tasks }) {
    const userId = useParams().userId;

    
    const [priority1, setPriority1] = useState(tasks?.filter(task => task.priority === 1));
    const [priority2, setPriority2] = useState(tasks?.filter(task => task.priority === 2));
    const [priority3, setPriority3] = useState(tasks?.filter(task => task.priority === 3));

    useEffect(() => {
        setPriority1(tasks?.filter(task => task.priority === 1));
        setPriority2(tasks?.filter(task => task.priority === 2));
        setPriority3(tasks?.filter(task => task.priority === 3));
    }, [tasks]);

    console.log(priority1)
    return (
        <>
        {!tasks && <Loading />}
        {tasks && (
            <div className='todo-container'>
                <div className="todo">
                    {/* <h1>TO DO APP HERE</h1> */}
                    <p>High Priority</p>
                    <div className='priority-1 priority-container'>
                        {priority1 && priority1.map(task => <Task key={task.id} task={task} />)}
                    </div>
                    <p>Medium Priority</p>
                    <div className='priority-2 priority-container'>
                        {priority2 && priority2.map(task => <Task key={task.id} task={task} />)}
                    </div>
                    <p>Low Priority</p>
                    <div className='priority-3 priority-container'>
                        {priority3 && priority3.map(task => <Task key={task.id} task={task} />)}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ToDo;

