import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewPost from './newpost';

function NewPostModal({ user, update, setUpdate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div onClick={() => setShowModal(!showModal)}>
      <NewPost disabled={true} user={user} />
    </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewPost showModal={showModal} setUpdate={setUpdate} update={update} disabled={false} setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default NewPostModal;