import { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";


export const SocketContext = createContext(null);
export const Socket = () => useContext(SocketContext);

function SocketProvider(props) {
    const user = useSelector(state => state.session.user);

    const socket = useRef(null);

    useEffect(() => {
        if (!user) return;
        if (socket.current) return;

        let websocket = new WebSocket(process.env.NODE_ENV === 'production' ? window.location.origin.replace(/^https/, 'wss') : window.location.origin.replace(/^http/, 'ws').replace(/3000/, '5000'));
        
        websocket.onopen = (e) => {
            console.log('Socket Connection');
        }

        websocket.onerror = (e) => {
            console.error(e);
        }
        
        websocket.onclose = (e) => {
            console.log('socket close')
            socket.current = null;
            // websocket = new WebSocket(process.env.NODE_ENV === 'production' ? window.location.origin.replace(/^https/, 'wss') : window.location.origin.replace(/^http/, 'ws').replace(/3000/, '5000'));
            // socket.current = websocket;
        }
        
        socket.current = websocket;
        
        // return function cleanup() {
        //     console.log('cleanup')
        //     if (socket.current !== null) {
        //         socket.current.close();
        //     }
        // }
    }, [user])

    // useEffect(() => {
    //     if (websocket.current !== null) {
    //         websocket.current.onmessage = (e) => {
    //             const parse = JSON.parse(e.data);
    //             const message = parse.data;
    //             message.created = new Date(message.created);
                
    //             if (parse.type === 'add-chat-message') {
    //                 setMessages([message, ...messages]);
    //             } 
    //             else if (parse.type === 'user-drawing' && message.username !== username) {
    //                 setUserDraw([message, ...userDraw])
    //             }
    //             else if (parse.type === 'user-reset') {
    //                 setReset(!reset);
    //             }
    //         }
    //     }

    // }, [messages, reset, setMessages, userDraw, username, websocket])
    
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;