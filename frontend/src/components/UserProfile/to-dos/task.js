import { useSpring, animated } from 'react-spring';
// import { useDrag } from '@use-gesture/react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskModal from './task-modal';


function Task({ task, moveTask, index }) {

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const ref = useRef();

    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { id: task.id, index, priority: task.priority, completed: task.completed },
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
        }
    });

    drag(drop(ref));


    return (
        <div ref={ref} style={{opacity: isDragging ? .1 : 1 }} className={isOver ? "switch-task" : "task-container"}>
            <div className="task-content">
                <h3><div id={task.priority === 1 ? 'high' : task.priority === 2 ? 'medium' : 'low'} ></div>{task.title}</h3>
                <div className='bar'></div>
                <div className='emptybar'></div>
                <div className='filledbar'></div>
            </div>
            <div className="task-buttons">
                <TaskModal task={task} />
                <button><i className="fas fa-trash-alt"></i></button>
            </div>
        </div>
    )
}

export default Task;
