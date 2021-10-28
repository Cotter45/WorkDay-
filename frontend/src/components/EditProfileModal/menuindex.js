import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProfile from './editprofile';

function MenuEditProfile({ user, editProfile, setEditProfile }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => {
          setEditProfile(true);
          setShowModal(!showModal)
    }} className='logout-button'>Edit Profile</button>
      {showModal && (
        <Modal onClose={() => {
            setEditProfile(false);
            setShowModal(false)
        }}>
            <EditProfile  setEditProfile={setEditProfile} user={user} setShowModal={setShowModal} showModal={showModal} />
        </Modal>
      )}
    </>
  );
}

export default MenuEditProfile;