import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditJob from './edit-job';

function EditJobModal({ job, setUpdate, update, showModal, setShowModal, createPost }) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
    {!showModal && !createPost && (
      <button className='edit-job' onClick={() => setShowModal(true)}><i className="fas fa-ellipsis-h fa-2x" /></button>
    )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditJob update={update} setUpdate={setUpdate} setShowModal={setShowModal} job={job} />
        </Modal>
      )}
    </>
  );
}

export default EditJobModal;