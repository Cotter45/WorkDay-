import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import Loading from '../../../util/loading';
import Task from "./task";
import './to-do.css';
import { useSelector } from 'react-redux';
import { get_tasks } from '../../../store/api';


function ToDo() {
    const userId = useParams().id;
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.data.tasks);

    const [taskCards, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) return;
        dispatch(get_tasks(userId));
        setLoaded(true);
    }, [dispatch, loaded, userId]);

    useEffect(() => {
        
        setTasks(tasks.filter(task => !task.completed));
        setCompletedTasks(tasks.filter(task => task.completed));
        setTasks(tasks);
    }, [tasks]);


    const moveTask = (dragIndex, hoverIndex, item) => {
        const dragCard = tasks.find(task => task.id === item.id);
        if (!dragCard.completed) {
            setTasks(update(taskCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        } else {
            setCompletedTasks(update(completedTasks, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }
    };
    
    const [{ isOverCompleted }, dropCompleted] = useDrop({
        accept: 'task',
        collect: monitor => ({
            isOverCompleted: monitor.isOver(),
        }),
        drop: (item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = completedTasks.findIndex(task => task.id === item.id);
            moveTaskToCompleted(dragIndex, hoverIndex, item);
        },
    });
    
    
    const moveTaskToCompleted = (dragIndex, hoverIndex, item) => {
        const dragCard = taskCards[dragIndex];
        const task = taskCards.find(task => task.id === item.id);
        if (task) {
            task.completed = true;
            setTasks(taskCards.filter((task) => task.id !== dragCard.id));
            setCompletedTasks([...completedTasks, dragCard]);
        }
    };
    

    

    return (
        <>
        {!tasks && <Loading />}
        {tasks && (
            <div className='todo-container'>
                <h2>Drag and drop tasks to mark complete</h2>
                <div className='dragndrop'>
                    <h2 className='dragheaders'>To Do</h2>
                    <h2 className='dragheaders'>Completed</h2>
                    <div className="todo">
                        {taskCards && taskCards.map((task, index) => (
                            <Task 
                                key={task.id}
                                index={index}
                                task={task}
                                moveTask={moveTask}
                                moveTaskToCompleted={moveTaskToCompleted}
                            />
                        ))}
                    </div>
                    <div ref={dropCompleted} className={isOverCompleted ? "hover-completed" : "completed"}>
                        {completedTasks && completedTasks.map((task, index) => (
                            <Task
                                key={task.id}
                                index={index}
                                task={task}
                                moveTask={moveTask}
                                moveTaskToCompleted={moveTaskToCompleted}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ToDo;

