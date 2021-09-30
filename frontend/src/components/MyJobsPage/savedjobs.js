import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { get_data } from "../../store/api";


function SavedJobs({ deleteSave, savedJobs, stateJobs, additionalInfo, jobId, setJobId, setAdditionalInfo }) {
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
        {savedJobs && savedJobs.map(save => (
            <div key={save.id} className='app-info-container'>
                <div className='app-info'>
                    <p>{save?.Job.title} for {save.Job.Company ? save.Job.Company?.name : 'Contract'}</p>
                    {additionalInfo && jobId === save.job_id && (
                        <>
                        <p>Location: {save.Job.location}</p>
                        <p>Pays: ${save.Job.pay}</p>
                        <p>Posted: {new Date(save.Job.createdAt).toDateString()}</p>
                        <p>Posted by: {save.Job.User.first_name + ' ' + save.Job.User.last_name}</p>
                        <p>Description: <br></br> {save.Job.description}</p>
                        {save.Job.Requirements && (
                            <div className='app-requirements'>
                                <p>Requirements: </p>
                                {save.Job.Requirements?.map(requirement => (
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
                    {additionalInfo && jobId === save.job_id && (
                        <button onClick={deleteSave} className='post-button'>Delete</button>
                    )}
                    <button className={additionalInfo && jobId === save.job_id ? 'selected' : 'post-button'} onClick={() => {
                        if (!additionalInfo) {
                            setJobId(save.job_id)
                            setAdditionalInfo(!additionalInfo)
                        } else if (additionalInfo && jobId === save.job_id) {
                            setJobId(save.job_id)
                            setAdditionalInfo(false)
                        } else {
                            setJobId(save.job_id)
                            setAdditionalInfo(true)
                        }
                    }}>{additionalInfo && jobId === save.job_id ? 'Less Info' : 'More Info'}</button>
                </div>
            </div>
        ))}
        {!savedJobs.length && (
            <div className='appless-info'>
                <p>Use the search bar to save jobs!</p>
            </div>
        )}
        </>
        )}
    </>
    )
}

export default SavedJobs;