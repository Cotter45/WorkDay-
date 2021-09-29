import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginSignupForm from './login-signup';

function LoginSignup() {
  const [showModal, setShowModal] = useState(false);

  const [login, setLogin] = useState(true);
  const [signUp, setSignUp] = useState(false);

  return (
    <>
        <div onClick={() => setShowModal(!showModal)} className='log-in'>
            <p>Log in/Sign up</p>
        </div>      
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <LoginSignupForm login={login} setLogin={setLogin} signUp={signUp} setSignUp={setSignUp} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginSignup;