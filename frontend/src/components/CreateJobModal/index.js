import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditJob from '../EditJobModal/edit-job';


function CreateJobModal({ job, setUpdate, update, showModal, setShowModal }) {
//   const [showModal, setShowModal] = useState(false);

  const createPost = true;

  return (
    <>
    {!showModal && (
      <button className='post-button' onClick={() => setShowModal(true)}>New Listing</button>
    )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditJob createPost={createPost} update={update} setUpdate={setUpdate} setShowModal={setShowModal} job={job} />
        </Modal>
      )}
    </>
  );
}

export default CreateJobModal;