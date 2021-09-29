import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormModal/sign-up';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import { get_data } from './store/api';
import Navigation from './components/Navigation';
import HomePage from './components/Home/home';
import Feed from './components/Feed/feed';
import UserProfile from './components/UserProfile/user_profile';
import MyJobs from './components/MyJobsPage/myjobs';
// import { Modal } from './context/Modal';



function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [appUpdate, setAppUpdate] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.session.user);
  const data = useSelector(state => state.session.data);

  let user_id;
  if (user) {
    user_id = user.id;
  }

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    
    if (user_id) {
      dispatch(get_data(user_id)).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [dispatch, user_id]);

  return (
    <>
      {!isLoaded && (
        <div className='loading'>Loading...</div>
      )}
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route exact only path='/'>
              <HomePage />
            </Route>
            <Route exact only path='/feed'>
              <Feed />
            </Route>
            <Route exact only path='/jobs'>
              <MyJobs isLoaded={isLoaded} setIsLoaded={setIsLoaded} user_id={user_id} />
            </Route>
            <Route path='/profile/:id'>
              <UserProfile />
            </Route>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
