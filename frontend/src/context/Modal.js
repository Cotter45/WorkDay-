import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated } from '@react-spring/web';

import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
        const root = document.getElementById('root');
        const html = document.querySelector('html');
        const body = document.querySelector('body');
        root.style.overflow = 'hidden';
        root.style.height = '80%';
        html.style.overflow = 'hidden';
        html.style.height = '80%';
        body.style.overflow = 'hidden';
        body.style.height = '80%';

        return () => {
            root.style.overflow = null;
            root.style.height = 'fit-content';
            html.style.overflow = null;
            html.style.height = 'fit-content';
            body.style.overflow = null;
            body.style.height = 'fit-content';
        }
    })

  const transitions = useTransition(showModal, {
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
  });

  if (!modalNode) return null;


  return ReactDOM.createPortal(
    <div id='modal'>
      <div id='modal-background' onClick={onClose} />
      {transitions((style, index) => (
        <animated.div 
          key={index}
          style={style}
          id='modal-content'>
            {children}
        </animated.div>
      ))}
    </div>,
    modalNode
  );
}
