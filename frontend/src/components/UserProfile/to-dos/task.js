import { useSpring, animated } from 'react-spring';
// import { useDrag } from '@use-gesture/react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';


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

    const [, drop] = useDrop({
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
        <animated.div ref={ref} style={{x, y, opacity: isDragging ? 0 : 1 }} className="task-container">
            <h3><div id={task.priority === 1 ? 'high' : task.priority === 2 ? 'medium' : 'low'} ></div>{task.title}</h3>
            <div className='bar'></div>
            <div className='emptybar'></div>
            <div className='filledbar'></div>
            <p className='task-date'>{new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p>---</p>
            <p className='task-description'>{task.description}</p>
        </animated.div>
    )
}

export default Task;
