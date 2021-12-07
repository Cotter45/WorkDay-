import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import TaskDetails from './task-details';

function TaskModal({ task, moveTaskToCompleted, setTasks, tasks }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(!showModal)} ><i className="fas fa-info-circle"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <TaskDetails moveTaskToCompleted={moveTaskToCompleted} setTasks={setTasks} tasks={tasks} task={task} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default TaskModal;