import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from './editpost';

function EditPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-post' onClick={() => setShowModal(true)}><i className="fas fa-ellipsis-h fa-2x" /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm setShowModal={setShowModal} post={post} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;