import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditJob from '../EditJobModal/edit-job';


function CreateJobModal({ job, setJobUpdate, jobUpdate }) {
  const [showModal, setShowModal] = useState(false);

  const createPost = true;

  return (
    <>
    {!showModal && (
      <button className='post-button' onClick={() => setShowModal(true)}>New Listing</button>
    )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditJob createPost={createPost} jobUpdate={jobUpdate} setJobUpdate={setJobUpdate} setShowModal={setShowModal} job={job} />
        </Modal>
      )}
    </>
  );
}

export default CreateJobModal;