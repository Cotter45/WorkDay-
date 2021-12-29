import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import Loading from '../../../util/loading';
import Task from "./task";
import './to-do.css';
import { useSelector } from 'react-redux';
import { complete_task, get_tasks } from '../../../store/api';
import CreateTaskModal from './create_task_modal';


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
        
        setTasks(tasks.filter(task => task.completed === false).sort((a, b) => a.position - b.position));
        setCompletedTasks(tasks.filter(task => task.completed === true).sort((a, b) => a.position - b.position));
        // setTasks(tasks);
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
            moveTaskToCompleted(item);
        },
    });

    const [{ isOverToDo }, dropToDo] = useDrop({
        accept: 'task',
        collect: monitor => ({
            isOverToDo: monitor.isOver(),
        }),
        drop: (item, monitor) => {
            moveTaskToToDo(item);
        },
    });
    
    
    const moveTaskToCompleted = (item) => {
        const task = taskCards.find(task => task.id === item.id);
        if (task) {
            task.completed = true;
            dispatch(complete_task(task.id));
            setTasks(taskCards.filter((t) => t.id !== task.id));
            setCompletedTasks([...completedTasks, task]);
        }
    };
    
    const moveTaskToToDo = (item) => {
        const task = completedTasks.find(task => task.id === item.id);
        if (task) {
            task.completed = false;
            dispatch(complete_task(task.id));
            setCompletedTasks(completedTasks.filter((t) => t.id !== task.id));
            setTasks([...taskCards, task]);
        }
    };
    

    return (
        <>
        {!loaded && <Loading />}
        {loaded && (
            <div className='todo-container'>
                <h2>Preview, not yet finished</h2>
                <div className='todo-heading'>
                    <h2>Drag and drop tasks to mark complete</h2>
                    <CreateTaskModal setTasks={setTasks} taskCards={taskCards} tasks={taskCards} />
                </div>
                <div className='dragndrop'>
                    <h2 className='dragheaders'>To Do</h2>
                    <h2 className='dragheaders'>Completed</h2>
                    <div ref={dropToDo} className={ isOverToDo ? "hover-todo" : "todo"}>
                        {taskCards && taskCards.map((task, index) => (
                            <Task 
                                key={task.id}
                                index={index}
                                task={task}
                                moveTask={moveTask}
                                moveTaskToCompleted={moveTaskToCompleted}
                                tasks={taskCards}
                                setTasks={setTasks}
                                setCompletedTasks={setCompletedTasks}
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
                                tasks={completedTasks}
                                setTasks={setTasks}
                                setCompletedTasks={setCompletedTasks}
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

