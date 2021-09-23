import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { login } from '../../store/session';
import './Navigation.css';
import JobSearch from './search';
import SignupFormModal from '../SignupFormModal';


function Navigation({ isLoaded }){
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const [search, setSearch] = useState(false);
  const [results, setResults] = useState([]);
  const [param, setParams] = useState('');

  const demo = () => {
    let credentials = {
      credential: 'demo@user.io',
      password: 'password'
    }

    dispatch(login(credentials));
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink activeClassName='active' className='nav-link' exact to="/feed"><i className="fas fa-home fa-2x" /></NavLink>
        <NavLink activeClassName='active' className='nav-link' exact to="/jobs"><i className="fas fa-briefcase fa-2x" /></NavLink>
        <NavLink activeClassName='active' className='nav-link' exact to="/messages"><i className="fas fa-comment-dots fa-2x" /></NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button className='nav-button' onClick={demo}>Demo</button>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <> 
      <nav className='nav'>
        <NavLink activeClassName='' className='logo' exact to="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt='logo'></img></NavLink>
        <JobSearch setSearch={setSearch} param={param} setParams={setParams} setResults={setResults} />
        <div className='nav-links'>
          {isLoaded && sessionLinks}
        </div>
      </nav>
      { search && (
        <div  className='results'>
          <div className='options'>
            <button>filter1</button>
            <button>filter1</button>
            <button>filter1</button>
          </div> 
          <div>
            <button onClick={() => {
              setSearch(false);
              setResults([]);
              setParams('');
            }}>Exit</button>
          </div>
          {results && results.map(result => (
            <div id='search-results' key={result.id}>
                <p>{result.title}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Navigation;