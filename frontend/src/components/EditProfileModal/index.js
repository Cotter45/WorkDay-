import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProfile from './editprofile';

function EditProfileModal({ user, setUpdate, update }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(!showModal)} className='edit-account'><i className="far fa-edit fa-2x"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <EditProfile setUpdate={setUpdate} update={update} user={user} setShowModal={setShowModal} showModal={showModal} />
        </Modal>
      )}
    </>
  );
}

export default EditProfileModal;