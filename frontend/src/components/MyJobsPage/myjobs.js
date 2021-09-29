import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


import './myjobs.css';
import ProfileCard from '../Feed/profile-card';
import Jobs from '../Jobs/jobs';
import JobResults from '../Navigation/Search/job-results';

function MyJobs() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const myApplications = useSelector(state => state.data.applications).filter(app => app.user_id === user.id);
    const stateJobs = useSelector(state => state.data.jobs);

    const [viewMyApps, setViewMyApps] = useState(true);
    const [viewSaved, setViewSaved] = useState(false);
    const [viewPosted, setViewPosted] = useState(false);
    const [reviewApps, setReviewApps] = useState(false);

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [jobId, setJobId] = useState('');
    const [job, setJob] = useState('');

    useEffect(() => {
        if (!jobId) return;
        setJob(stateJobs.find(job => job.id === jobId))
    }, [jobId, stateJobs])

    const visitProfile = () => {
        history.push(`/profile/${user.id}/posts`)
    }

    return (
        <div className='myjobs-main-container'>
            <div className='myjobs-container'>
                <div className='left-columns'>
                    <div className='menu'>
                        <div onClick={() => {
                            setViewMyApps(!viewMyApps)
                            setViewSaved(false)
                            setViewPosted(false)
                            setReviewApps(false)
                        }} className='menu-tabs'>
                            <i className="far fa-money-bill-alt"></i>
                            <p>My Applications</p>
                        </div>
                        <div onClick={() => {
                            setViewMyApps(false)
                            setViewSaved(!viewSaved)
                            setViewPosted(false)
                            setReviewApps(false)
                        }} className='menu-tabs'>
                            <i className="fas fa-bookmark"></i>
                            <p> Saved Jobs</p>
                        </div>
                        <div onClick={() => {
                            setViewMyApps(false)
                            setViewSaved(false)
                            setViewPosted(!viewPosted)
                            setReviewApps(false)
                        }} className='menu-tabs'>
                            <i className="fas fa-briefcase"></i>
                            <p> Posted Jobs</p>
                        </div>
                        <div onClick={() => {
                            setViewMyApps(false)
                            setViewSaved(false)
                            setViewPosted(false)
                            setReviewApps(!reviewApps)
                        }} className='menu-tabs'>
                            <i className="fas fa-user-check"></i>
                            <p> Review Applicants</p>
                        </div>
                    </div>
                    <ProfileCard visitProfile={visitProfile} user={user} />
                </div>
                <div className='right-columns'>
                    {viewMyApps && myApplications.map(app => (
                        <div key={app.id} className='app-info-container'>
                            <div className='app-info'>
                                <p>{app.Job.title} for {stateJobs.find(job => job.id === app.job_id) ? stateJobs.find(job => job.id === app.job_id).Company.name : 'Contract'}</p>
                                {additionalInfo && jobId === app.id && (
                                    <>
                                    <p>Location: {app.Job.location}</p>
                                    <p>Pays: ${app.Job.pay}</p>
                                    <p>Posted: {new Date(app.Job.createdAt).toDateString()}</p>
                                    <p>Posted by: {app.User.first_name + ' ' + app.User.last_name}</p>
                                    <p>Description: <br></br> {app.Job.description}</p>
                                    {job.Requirements && (
                                        <div className='app-requirements'>
                                            <p>Requirements: </p>
                                            {job.Requirements.map(requirement => (
                                                <div key={requirement.id}>
                                                    <li>{requirement.requirement}</li>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    </>
                                )}
                            </div>
                            <div className='post-buttons'>
                                <button className={additionalInfo && jobId === app.id ? 'selected' : 'post-button'} onClick={() => {
                                    if (!additionalInfo) {
                                        setJobId(app.id)
                                        setAdditionalInfo(!additionalInfo)
                                    } else if (additionalInfo && jobId === app.id) {
                                        setJobId(app.id)
                                        setAdditionalInfo(false)
                                    } else {
                                        setJobId(app.id)
                                        setAdditionalInfo(true)
                                    }
                                }}>{additionalInfo && jobId === app.id ? 'Less Info' : 'More Info'}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyJobs;