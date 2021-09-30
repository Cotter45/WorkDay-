import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


import MenuButton from './MenuButton';
import LoginFormModal from '../LoginFormModal';
import { login } from '../../store/session';
import './Navigation.css';
import Search from './Search/search';
import SignupFormModal from '../SignupFormModal';
import Results from './Search/searchresults';


function Navigation({ isLoaded }){
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const searchResults = useSelector(state => state.data.search);

  const [search, setSearch] = useState(false);
  const [results, setResults] = useState([]);
  const [param, setParams] = useState('');

  const [jobs, setJobs] = useState(false);
  const [companies, setCompanies] = useState(false);
  const [users, setUsers] = useState(false);

  useEffect(() => {
    if (!search) return;

    if (param) {
      setResults(searchResults);
    }

  }, [param, search, searchResults])

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
        {/* <NavLink activeClassName='active' className='nav-link' exact to="/messages"><i className="fas fa-comment-dots fa-2x" /></NavLink> */}
        <MenuButton user={sessionUser} />
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
    <div className='nav-container'> 
      <nav className='nav'>
        <NavLink activeClassName='' className='logo' exact to="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt='logo'></img></NavLink>
        <Search setSearch={setSearch} param={param} setParams={setParams} setResults={setResults} />
        <div className='nav-links'>
          {isLoaded && sessionLinks}
        </div>
      </nav>
      { search && (
        <div  className='results'>
          <div className='post-buttons'>
            <button
              className={ jobs ? 'selected' : 'post-button'}
              onClick={() => {
                setJobs(!jobs)
                setCompanies(false)
                setUsers(false)
              }}
              >Jobs</button>
            {/* <button
              className={ companies ? 'selected' : 'post-button'}
              onClick={() => {
                setJobs(false)
                setCompanies(!companies)
                setUsers(false)
              }}
              >Companies</button> */}
            <button
              className={ users ? 'selected' : 'post-button'}
              onClick={() => {
                setJobs(false)
                setCompanies(false)
                setUsers(!users)
              }}
              >Users</button>
          </div> 
          <button className='close-search' onClick={() => {
            setSearch(false);
            setResults([]);
            setParams('');
          }}><i className="fas fa-times" /></button>
          <Results jobs={jobs} companies={companies} users={users} results={results} uuidv4={uuidv4} />
        </div>
      )}
    </div>
  );
}

export default Navigation;