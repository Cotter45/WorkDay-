import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import CreateJobModal from '../CreateJobModal';

import EditJobModal from '../EditJobModal';

import './jobs.css';

function Jobs() {
    const userId = useParams().id;


    // const user = useSelector(state => state.session.user);
    const user = useSelector(state => state.data.users.find(user => user.id === +userId));

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [jobId, setJobId] = useState('');
    const [jobUpdate, setJobUpdate] = useState(false);
    const [jobs, setJobs] = useState(user?.Jobs);

    useEffect(() => {
        if (jobs) return;
        setJobs(user?.Jobs);
    }, [jobs, user])

    useEffect(() => {
        if (!jobUpdate) return;
        setJobs(user?.Jobs)
    }, [jobUpdate, user?.Jobs])


    return (
        <div className='jobs-main-container'>
            <>
            <div className='new-post-button'>
                <CreateJobModal jobUpdate={jobUpdate} setJobUpdate={setJobUpdate} />
            </div>
            {jobs && jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((job, index) => (
                <div key={job.message ? index : uuidv4()} className='job-container'>
                    {!job.message && job.poster_id === user.id && (
                        <EditJobModal jobUpdate={jobUpdate} setJobUpdate={setJobUpdate} job={job} />
                    )}
                    {!job.message && (
                    <>
                    <div className='job-info'>
                        <p>{job.title} for {job.Company ? job.Company.name : 'Contract'}</p>
                        <p>Location: {job.location}</p>
                        <p>Pays: ${job.pay}</p>
                        <p>Posted: {new Date(job.createdAt).toDateString()}</p>
                        {additionalInfo && jobId === job.id && (
                            <div className='job-additional-info'>
                                <p>Posted by: {job.User.first_name + ' ' + job.User.last_name}</p>
                                <p>Description: <br></br> {job.description}</p>
                                {job.Requirements && (
                                    <div className='job-requirements'>
                                        <p>Requirements: </p>
                                        {job.Requirements.map(requirement => (
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
                    {job.Company && (
                        <>
                        <div className='job-company-info'>
                            <div className='profile-images'>
                                <div className='background-image-container'>
                                    <img alt='company' className='company-background' src={job.Company.background_image}></img>
                                </div>
                                <img className='profile-image' src={job.Company.profile_picture} alt='profile'></img>
                            </div>
                        </div>
                        {additionalInfo && jobId === job.id && (
                            <div>
                                <p className='applicants'>{job.Applications.length} applicants</p>
                                <p>Email: {job.Company.email}</p>
                                <p>Phone: {job.Company.phone}</p>
                                <p>Founded: {new Date(job.Company.founded).toDateString()}</p>
                            </div>
                        )}
                        </>
                    )}
                    {!job.Company && (
                    <div className='job-column'>
                            <div className='job-company-info'>
                                <div className='profile-images'>
                                    <div className='background-image-container'>
                                        <img alt='company' className='company-background' src={user.background_image}></img>
                                    </div>
                                    <img className='profile-image' src={user.profile_picture} alt='profile'></img>
                                </div>
                            </div>
                            <div>
                                {/* <p className='applicants'>{applications?.length} applicants</p> */}
                                <p>Email: {user.email}</p>
                            </div>
                        </div>
                    )}
                        <div>
                            <button className='post-button' onClick={() => {
                                if (!additionalInfo) {
                                    setJobId(job.id)
                                    setAdditionalInfo(!additionalInfo)
                                } else if (additionalInfo && jobId === job.id) {
                                    setJobId(job.id)
                                    setAdditionalInfo(false)
                                } else {
                                    setJobId(job.id)
                                    setAdditionalInfo(true)
                                }
                            }}>{additionalInfo && jobId === job.id ? 'Less Info' : 'More Info'}</button>
                        </div>
                    </div>
                </>
                )}
                {job.message && (
                    <p key={uuidv4()}>{job.message}</p>
                )}
                </div>
            ))}
            </>
        </div>
    )
}

export default Jobs;