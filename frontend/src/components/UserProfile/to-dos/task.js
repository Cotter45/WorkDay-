import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { delete_task, move_task } from '../../../store/api';

import TaskModal from './task-modal';


function Task({ task, moveTask, index, tasks, moveTaskToCompleted, setTasks, setCompletedTasks  }) {
    const dispatch = useDispatch();

    const ref = useRef();

    const [deleted, setDeleted] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { id: task.id, index, priority: task.priority, completed: task.completed, prevIndex: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ isOver }, drop] = useDrop({
        accept: 'task',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            const hoverBoundary = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundary.bottom - hoverBoundary.top) / 2;
            const hoverActualY = monitor.getClientOffset().y - hoverBoundary.top;

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            if (dragIndex === hoverIndex) {
                return;
            }

            if (moveTask) {
                moveTask(dragIndex, hoverIndex, item);
                item.index = hoverIndex;
            }

        },
        drop(item) {
            const dragIndex = item.index;
            
            tasks[dragIndex].position = dragIndex;
            for (let i = dragIndex + 1; i < tasks.length; i++) {
                tasks[i].position = i;
            }
            dispatch(move_task(tasks));
        }
    });

    drag(drop(ref));


    const deleteTask = (task) => {
        dispatch(delete_task(task.id));
        setDeleted(true);
    }

    if (deleted) {
        setTimeout(() => {
            if (task.completed) {
                setCompletedTasks(tasks.filter(t => t.id !== task.id));
            } else {
                setTasks(tasks.filter(t => t.id !== task.id));
            }
        }, 2000);
        return <p>Great job!</p>;
    }

    return (
        <div ref={ref} style={{opacity: isDragging ? .1 : 1 }} className={isOver ? "switch-task" : "task-container"}>
            <div className="task-content">
                <h3><div id={task.priority === 1 ? 'high' : task.priority === 2 ? 'medium' : 'low'} ></div>{task.title}</h3>
                <div className='bar'></div>
                <div className='emptybar'></div>
                <div className='filledbar'></div>
            </div>
            <div className="task-buttons">
                <TaskModal moveTaskToCompleted={moveTaskToCompleted} task={task} />
                <button onClick={() => deleteTask(task)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )
}

export default Task;
