import { Link } from "react-router-dom";

import './not-found.css';

function NotFound() {
    return (
        <div className='main-container'>
            <img className='take_me_home' src={'/images/take_me_home.gif'} alt='Take me home' />
            <div className='lost-container'>
                <h1>404</h1>
                <p>Page not found</p>
                <h1>404</h1>
            </div>
            <Link className='lost-link' to='/'>Country roads, Take me home. To the place, I belong!</Link>
        </div>
    )
}

export default NotFound;