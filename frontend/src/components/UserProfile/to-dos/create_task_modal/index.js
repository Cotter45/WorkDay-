import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import CreateTask from './create_task';

function CreateTaskModal({ tasks, setTasks, taskCards }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='add-task-button' onClick={() => setShowModal(!showModal)}>+</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <CreateTask setTasks={setTasks} taskCards={taskCards} tasks={tasks} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateTaskModal;