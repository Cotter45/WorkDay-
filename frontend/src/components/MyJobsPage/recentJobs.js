import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { get_data, get_jobs, job_application, save_job } from "../../store/api";


function RecentJobs() {
    const dispatch = useDispatch();
    const history = useHistory();

    const jobs = useSelector(state => state.data.recent_jobs);
    const user = useSelector(state => state.session.user);
    const applications = useSelector(state => state.data.applications);
    const saved_jobs = useSelector(state => state.data.saved_jobs);

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [jobId, setJobId] = useState('');
    const [userId, setUserId] = useState('');
    const [getJobs, setGetJobs] = useState(false);
    const [applied, setApplied] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (getJobs) return;
        dispatch(get_jobs())
        setGetJobs(true);
    }, [dispatch, getJobs]);

    const apply = async (e) => {
        const job = jobs.find(job => job.id === jobId);

        const app = {
            user_id: user.id,
            job_id: job.id
        }

        setApplied(true);
        await dispatch(job_application(app));
    }
    
    const save = async (e) => {
        const job = jobs.find(job => job.id === jobId);

        const app = {
            user_id: user.id,
            job_id: job.id
        }

        setSaved(true);
        await dispatch(save_job(app));
    }

    return (
        <div className="applicant-main-container">
            {jobs && jobs.map(job => (
                <div key={job.id} >
                    <div className='applicant-container'>
                        <div>
                            <p>{job.title} for {job.Company ? job.Company.name : 'Contract'}</p>
                            {additionalInfo && jobId === job.id && (
                                <>
                                <p>Posted By: <Link to={`/profile/${job.User.id}`}>{job.User.first_name} {job.User.last_name}</Link></p>
                                <p>Description: {job.description}</p>
                                <p>Location: {job.location}</p>
                                <p>Pay: ${job.pay}</p>
                                <p>Date Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                                </>
                            )}
                        </div>
                            <div className='button-container'>
                                {additionalInfo && jobId === job.id && (
                                    <div className='app-buttons'>
                                        {!applications.find(app => app.job_id === job.id) && !applied && (
                                        <button onClick={(e) => apply()} className='app-button'>Apply</button>
                                        )}
                                        {!saved_jobs.find(save => save.job_id === job.id) && !saved && (
                                            <button onClick={(e) => save()} className='app-button'>Save</button>
                                        )}
                                    </div>
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