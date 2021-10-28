import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { get_jobs } from "../../store/api";


function RecentJobs() {
    const dispatch = useDispatch();
    const history = useHistory();

    const jobs = useSelector(state => state.data.recent_jobs);
    const user = useSelector(state => state.session.user);

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [jobId, setJobId] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        dispatch(get_jobs())
        
    })

    return (
        <div className="applicant-main-container">
            {jobs && jobs.map(job => (
                <div key={job.id} >
                    <div className='applicant-container'>
                        <div>
                            <p>{job.User.first_name} {job.User.last_name} for {job.title}</p>
                            {additionalInfo && jobId === job.id && (
                                <>
                                <p>Email: {job.User.email}</p>
                                <p>Location: {job.User.location}</p>
                                <p>Current Job: {job.User.current_job}</p>
                                </>
                            )}
                        </div>
                        <div className='button-container'>
                            {additionalInfo && jobId === job.id && (
                                <>
                                <button onClick={() => history.push(`/profile/${userId}`)} className='post-button'>View Profile</button>
                                </>
                            )}
                            <button className={additionalInfo && jobId === job.id ? 'selected' : 'post-button'} onClick={() => {
                                if (!additionalInfo) {
                                    setJobId(job.id);
                                    setUserId(job.User.id)
                                    setAdditionalInfo(!additionalInfo)
                                } else if (additionalInfo && jobId === job.id) {
                                    setJobId(job.id);
                                    // setUserId(app.User.id)
                                    setAdditionalInfo(false)
                                } else {
                                    setJobId(job.id);
                                    setUserId(job.User.id)
                                    setAdditionalInfo(true)
                                }
                            }}>{additionalInfo && jobId === job.id ? 'Less Info' : 'More Info'}</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecentJobs;