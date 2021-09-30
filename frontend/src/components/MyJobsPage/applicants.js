import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get_data, job_application } from '../../store/api';

function Applicants() {
    const history = useHistory();
    const dispatch = useDispatch();

    const jobs = useSelector(state => state.data.jobs).filter(job => job.Applications.length > 0);
    const user = useSelector(state => state.session.user);

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [appId, setappId] = useState('');
    const [jobId, setJobId] = useState('');
    const [userId, setUserId] = useState('');
    const [update, setUpdate] = useState(false);

    const handleDelete = async () => {

        const app = {
            job_id: jobId,
            user_id: userId 
        }

        await dispatch(job_application(app));
        await dispatch(get_data(user.id));
    }

    return (
        <div className='applicant-main-container'>
            {jobs && jobs.map(job => (
                <div key={job.id} >
                    {job.Applications && job.Applications.map(app => (
                        <div className='applicant-container' key={app.id}>
                            <div>
                                <p>{app.User.first_name} {app.User.last_name} for {job.title}</p>
                                {additionalInfo && appId === app.id && (
                                    <>
                                    <p>Email: {app.User.email}</p>
                                    <p>Location: {app.User.location}</p>
                                    <p>Current Job: {app.User.current_job}</p>
                                    </>
                                )}
                            </div>
                            <div className='button-container'>
                                {additionalInfo && appId === app.id && (
                                    <>
                                    <button onClick={() => history.push(`/profile/${userId}`)} className='post-button'>View Profile</button>
                                    <button onClick={handleDelete} className='post-button'>Delete</button>
                                   </>
                                )}
                                <button className={additionalInfo && appId === app.id ? 'selected' : 'post-button'} onClick={() => {
                                    if (!additionalInfo) {
                                        setJobId(job.id);
                                        setappId(app.id)
                                        setUserId(app.User.id)
                                        setAdditionalInfo(!additionalInfo)
                                    } else if (additionalInfo && appId === app.id) {
                                        setJobId(job.id);
                                        setappId(app.id)
                                        // setUserId(app.User.id)
                                        setAdditionalInfo(false)
                                    } else {
                                        setJobId(job.id);
                                        setappId(app.id)
                                        setUserId(app.User.id)
                                        setAdditionalInfo(true)
                                    }
                                }}>{additionalInfo && appId === app.id ? 'Less Info' : 'More Info'}</button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Applicants;