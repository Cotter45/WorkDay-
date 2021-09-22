import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);

  const [additional, setAdditional] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <> 
      <nav className='nav' onMouseEnter={() => setAdditional(true)}>
        <div className='nav-links'>
          <NavLink to="/"><i className="fas fa-home fa-2x" /></NavLink>
          <NavLink to="/jobs"><i className="fas fa-briefcase fa-2x" /></NavLink>
          <NavLink to="/messages"><i className="fas fa-comment-dots fa-2x" /></NavLink>
          {isLoaded && sessionLinks}
        </div>
      </nav>
        {additional && (
          <div  onMouseLeave={() => setAdditional(false)} className='additional-info'>
            <h1>extra info</h1>
          </div>
        )}
    </>
  );
}

export default Navigation;