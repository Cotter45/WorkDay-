import { useState, } from 'react';

import Task from "./task";

function ToDo({ user }) {

    const [priority1, setPriority1] = useState(user.Tasks.filter(task => task.priority === 1));
    const [priority2, setPriority2] = useState(user.Tasks.filter(task => task.priority === 2));
    const [priority3, setPriority3] = useState(user.Tasks.filter(task => task.priority === 3));

    console.log(priority1)
    return (
        <div className='todo-container'>
            <div className="todo">
                <h1>TO DO APP HERE</h1>
                <div className='priority-1'>
                    {priority1 && priority1.map(task => <Task key={task.id} task={task} />)}
                </div>
                <div className='priority-2'>
                    {priority2 && priority2.map(task => <Task key={task.id} task={task} />)}
                </div>
                <div className='priority-3'>
                    {priority3 && priority3.map(task => <Task key={task.id} task={task} />)}
                </div>
            </div>
        </div>
    )
}

export default ToDo;