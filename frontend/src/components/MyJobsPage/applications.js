import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { get_data } from "../../store/api";



function Applications({ apps, additionalInfo, jobId, stateJobs, deleteApp, setJobId, setAdditionalInfo}) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!user) return;
        if (loaded) return;
        (async function getStuff() {
            await dispatch(get_data(user.id));
        })()
        setLoaded(true);
    }, [dispatch, loaded, user])


    return (
        <>
        {loaded && (
            <>
            {apps && apps.map(app => (
                <div key={app.id} className='app-info-container'>
                    <div className='app-info'>
                        <p>{app.Job.title} for {app.Job.Company?.name ? app.Job.Company?.name : 'Contract'}</p>
                        {additionalInfo && jobId === app.Job.id && (
                            <>
                            <p>Location: {app.Job.location}</p>
                            <p>Pays: ${app.Job.pay}</p>
                            <p>Posted: {new Date(app.Job.createdAt).toDateString()}</p>
                            <p>Posted by: {app.User.first_name + ' ' + app.User.last_name}</p>
                            <p>Description: <br></br> {app.Job.description}</p>
                            {app.Job.Requirements && (
                                <div className='app-requirements'>
                                    <p>Requirements: </p>
                                    {app.Job.Requirements?.map(requirement => (
                                        <div key={requirement.id}>
                                            <li>{requirement.requirement}</li>
                                        </div>
                                    ))}
                                </div>
                            )}
                            </>
                        )}
                    </div>
                    <div className='app-buttons'>
                        {additionalInfo && jobId === app.Job.id && (
                            <button onClick={() => deleteApp()} className='post-button'>Delete</button>
                        )}
                        <button className={additionalInfo && jobId === app.Job.id ? 'selected' : 'post-button'} onClick={() => {
                            if (!additionalInfo) {
                                setJobId(app.Job.id)
                                setAdditionalInfo(!additionalInfo)
                            } else if (additionalInfo && jobId === app.Job.id) {
                                setJobId(app.Job.id)
                                setAdditionalInfo(false)
                            } else {
                                setJobId(app.Job.id)
                                setAdditionalInfo(true)
                            }
                        }}>{additionalInfo && jobId === app.Job.id ? 'Less Info' : 'More Info'}</button>
                    </div>
                </div>
            ))}
            {!apps.length && (
                <div className='appless-info'>
                    <p>Use the search bar to apply for jobs!</p>
                </div>
            )}
            </>
        )}
        </>
    )
}

export default Applications;