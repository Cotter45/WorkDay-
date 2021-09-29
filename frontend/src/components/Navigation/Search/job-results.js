import { useSelector } from 'react-redux';
import { useState } from 'react';
import LoginSignup from '../../LoginOrSignup';

function JobResults({ result, additionalInfo, jobId, setJobId, setAdditionalInfo, user }) {

    const sessionUser = useSelector(state => state.session.user);

    const [loggedIn, setLoggedIn] = useState(sessionUser ? true : false);


    const apply = (e) => {
        console.log('apply', user)
        if (sessionUser) {

        } else {
            setLoggedIn(true)
        }
    }
    
    const save = (e) => {
        console.log('save')

    }

    return (
        <>
        <div className='job-results'>
            <div className='job-result-info'>
                <p>{result.title} for {result.Company ? result.Company.name : 'Contract'}</p>
                {additionalInfo && jobId === result.id && (
                    <div className='job-additional-info'>
                        <p>Location: {result.location}</p>
                        <p>Pays: ${result.pay}</p>
                        <p>Posted: {new Date(result.createdAt).toDateString()}</p>
                        <p>Posted by: {result.User.first_name + ' ' + result.User.last_name}</p>
                        <p>Description: <br></br> {result.description}</p>
                        {result.Requirements && (
                            <div className='job-requirements'>
                                <p>Requirements: </p>
                                {result.Requirements.map(requirement => (
                                    <div key={requirement.id}>
                                        <li>{requirement.requirement}</li>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className='job-column'>
                {result.Company && (
                    <>
                    {additionalInfo && jobId === result.id && (
                        <div>
                            <p className='applicants'>{result.Applications.length} applicants</p>
                            <p>Email: {result.Company.email}</p>
                            <p>Phone: {result.Company.phone}</p>
                            <p>Founded: {new Date(result.Company.founded).toDateString()}</p>
                            {loggedIn && (
                                <div className='app-buttons'>
                                    <button onClick={(e) => apply()} className='app-button'>Apply</button>
                                    <button className='app-button'>Save</button>
                                </div>
                            )}
                            {!loggedIn && (
                                <LoginSignup />
                            )}
                        </div>
                    )}
                    </>
                )}
                {!result.Company && (
                    <>
                    {additionalInfo && jobId === result.id && (
                        <>
                        <div className='job-company-info'>
                            <div className='profile-images'>
                                <div className='background-image-container'>
                                    <img alt='company' className='company-background' src={user.background_image}></img>
                                </div>
                                <img className='profile-image' src={user.profile_picture} alt='profile'></img>
                            </div>
                        </div>
                        <div>
                            <p className='applicants'>{result.Applications?.length} applicants</p>
                            <p>Email: {user.email}</p>
                        </div>
                        {loggedIn && (
                            <div className='app-buttons'>
                                <button onClick={(e) => apply()} className='app-button'>Apply</button>
                                <button className='app-button'>Save</button>
                            </div>
                        )}
                        {!loggedIn && (
                            <LoginSignup />
                        )}
                        </>
                    )}
                    </>
                )}
            <div className='post-buttons'>
                <button className={additionalInfo && jobId === result.id ? 'selected' : 'post-button'} onClick={() => {
                    if (!additionalInfo) {
                        setJobId(result.id)
                        setAdditionalInfo(!additionalInfo)
                    } else if (additionalInfo && jobId === result.id) {
                        setJobId(result.id)
                        setAdditionalInfo(false)
                    } else {
                        setJobId(result.id)
                        setAdditionalInfo(true)
                    }
                }}>{additionalInfo && jobId === result.id ? 'Less Info' : 'More Info'}</button>
            </div>
            </div>
        </div>
            </>
    )
}

export default JobResults;