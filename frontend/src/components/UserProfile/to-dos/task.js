import { useSpring, animated } from 'react-spring';
// import { useDrag } from '@use-gesture/react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';


function Task({ task, moveTask, moveTask2, moveTask3, index }) {

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const ref = useRef();

    const type = 'task';

    const [{ isDragging }, drag] = useDrag({
        type,
        item: { type, id: task.id, index, priority: task.priority },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: type,
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

            moveTask(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [, drop2] = useDrop({
        accept: type,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveTask2(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [, drop3] = useDrop({
        accept: type,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveTask3(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    // drag(drop(drop2(drop3(ref))));
    drag(drop(ref));

    return (
        <animated.div draggable ref={ref} style={{x, y, opacity: isDragging ? 0 : 1 }} className="task-container">
            <h3>{task.title}</h3>
            <div className='bar'></div>
            <div className='emptybar'></div>
            <div className='filledbar'></div>
            <p id={task.priority === 1 ? 'high' : task.priority === 2 ? 'medium' : 'low'} >{task.priority === 1 ? 'High Priority' : task.priority === 2 ? 'Medium Priority' : 'Low Priority'}</p>
            <p>{new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p>{task.description}</p>
        </animated.div>
    )
}

export default Task;
