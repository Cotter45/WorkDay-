import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';

import Loading from '../../../util/loading';
import Task from "./task";
import './to-do.css';


function ToDo({ tasks }) {
    const userId = useParams().userId;

    const [taskCards, setTasks] = useState([]);
    const [priority1, setPriority1] = useState(tasks?.filter(task => task.priority === 1));
    const [priority2, setPriority2] = useState(tasks?.filter(task => task.priority === 2));
    const [priority3, setPriority3] = useState(tasks?.filter(task => task.priority === 3));

    useEffect(() => {
        setPriority1(tasks?.filter(task => task.priority === 1));
        setPriority2(tasks?.filter(task => task.priority === 2));
        setPriority3(tasks?.filter(task => task.priority === 3));
        setTasks(tasks);
    }, [tasks]);


    const moveTask = (dragIndex, hoverIndex) => {
        const dragCard = taskCards[dragIndex];
        setTasks(update(taskCards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    };

    const moveTask2 = (dragIndex, hoverIndex) => {
        const dragCard = priority2[dragIndex];
        setPriority2(
            update(priority2, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
        );
    };

    const moveTask3 = (dragIndex, hoverIndex) => {
        const dragCard = priority3[dragIndex];
        setPriority3(
            update(priority3, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
        );
    };
    

    return (
        <>
        {!tasks && <Loading />}
        {tasks && (
            <DndProvider backend={HTML5Backend}>
                <div className='todo-container'>
                    <div className="todo">
                        {taskCards && taskCards.map((task, index) => (
                            <Task 
                                key={task.id}
                                index={index}
                                task={task}
                                moveTask={moveTask}
                                moveTask2={moveTask2}
                                moveTask3={moveTask3}
                            />
                        ))}
                        {/* <h1>TO DO APP HERE</h1> */}
                        {/* <p>High Priority</p>
                        <div className='priority-1 priority-container'>
                            {priority1 && priority1.map((task, index) => <Task
                                moveTask={moveTask}
                                // moveTask2={moveTask2}
                                // moveTask3={moveTask3}
                                key={task.id} 
                                task={task} 
                                index={index}
                             />)}
                        </div>
                        <p>Medium Priority</p>
                        <div className='priority-2 priority-container'>
                            {priority2 && priority2.map((task, index) => <Task
                                // moveTask={moveTask}
                                moveTask2={moveTask2}
                                // moveTask3={moveTask3}
                                key={task.id} 
                                task={task} 
                                index={index}
                             />)}
                        </div>
                        <p>Low Priority</p>
                        <div className='priority-3 priority-container'>
                            {priority3 && priority3.map((task, index) => <Task
                                // moveTask={moveTask}
                                // moveTask2={moveTask2}
                                moveTask3={moveTask3}
                                key={task.id} 
                                task={task} 
                                index={index}
                             />)}
                        </div> */}
                    </div>
                </div>
            </DndProvider>
        )}
        </>
    )
}

export default ToDo;

