import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from './editpost';

function EditPostModal({ post, setUpdate, update }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-post' onClick={() => setShowModal(true)}><i className="fas fa-ellipsis-h fa-2x" /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm update={update} setUpdate={setUpdate} setShowModal={setShowModal} post={post} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;