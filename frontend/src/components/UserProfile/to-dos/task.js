import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';


function Task({ task }) {

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const parent = document.querySelector(`.priority-${task.priority}`);
    const parentBounds = parent.getBoundingClientRect();
    console.log(parentBounds);

//     const bind = useDrag(({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }), {
//     bounds: parentBounds,
//   })

    // bind drag to parent container bounds
    const bind = useDrag(({ offset: [x, y] }) => api.set({ x, y, }), {
        bounds: parentBounds,
    })


    return (
        <animated.div {...bind()} style={{x, y}} className="task-container">
            <h3>{task.title}</h3>
            <p>{new Date(task.createdAt).toLocaleTimeString()} {new Date(task.createdAt).toLocaleDateString()}</p>
            <p>{task.description}</p>
        </animated.div>
    )
}

export default Task;