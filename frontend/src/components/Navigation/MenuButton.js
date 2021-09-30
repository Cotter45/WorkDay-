import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function MenuButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    history.push('/');
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='menu-button' onClick={openMenu}>
        <i className="fas fa-bars fa-2x" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div onClick={() => history.push(`/profile/${user.id}`)} className='dropdown-card'>
            <div>
              <img className='dropdown-img' src={user.profile_picture} alt='me'></img>
            </div>
            <div>
              <li>{user.first_name}</li>
              <li>{user.last_name}</li>
              <li>{user.email}</li>
            </div>
          </div>
          <button className='logout-button' onClick={logout}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default MenuButton;
