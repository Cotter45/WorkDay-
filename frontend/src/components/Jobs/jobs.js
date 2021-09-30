import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import CreateJobModal from '../CreateJobModal';

import EditJobModal from '../EditJobModal';

import './jobs.css';

function Jobs({ viewPosted }) {
    const userId = useParams().id;


    const me = useSelector(state => state.session.user);
    const users = useSelector(state => state.data.users);
    const user = useSelector(state => state.data.users.find(user => user.id === +userId));

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [jobId, setJobId] = useState('');
    const [jobUpdate, setJobUpdate] = useState(false);
    const [jobs, setJobs] = useState('');

    useEffect(() => {
        if (jobs) return;
        setJobs(viewPosted ? users.find(user => user.id === me.id).Jobs : users.find(user => user.id === +userId).Jobs);
    }, [jobs, me.id, user, userId, users, viewPosted])

    useEffect(() => {
        if (!jobUpdate) return;
        setJobs(viewPosted ? users.find(user => user.id === me.id).Jobs : users.find(user => user.id === +userId).Jobs)
    }, [jobUpdate, me.id, user, userId, users, viewPosted])


    return (
        <div className='jobs-main-container'>
            <>
            {me && (me.id === +userId) && (
                <div className='new-post-button'>
                    <CreateJobModal jobUpdate={jobUpdate} setJobUpdate={setJobUpdate} />
                </div>
            )}
            {!viewPosted && jobs && jobs.filter(job => job.poster_id === +userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((job, index) => (
                <div key={job.message ? index : uuidv4()} className='job-container'>
                    {!job.message && job.poster_id === me.id && (
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
                                        <img alt='company' className='company-background' src={user ? user.background_image : me.background_image}></img>
                                    </div>
                                    <img className='profile-image' src={user ? user.profile_picture : me.profile_picture} alt='profile'></img>
                                </div>
                            </div>
                            <div>
                                {/* <p className='applicants'>{applications?.length} applicants</p> */}
                                <p>Email: {user ? user.email : me.email}</p>
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
            {me && viewPosted && (
                <div className='new-post-button'>
                    <CreateJobModal jobUpdate={jobUpdate} setJobUpdate={setJobUpdate} />
                </div>
            )}
            {viewPosted && jobs && jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((job, index) => (
                <div key={job.message ? index : uuidv4()} className='job-container'>
                    {!job.message && job.poster_id === me.id && (
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
                                        <img alt='company' className='company-background' src={user ? user.background_image : me.background_image}></img>
                                    </div>
                                    <img className='profile-image' src={user ? user.profile_picture : me.profile_picture} alt='profile'></img>
                                </div>
                            </div>
                            <div>
                                {/* <p className='applicants'>{applications?.length} applicants</p> */}
                                <p>Email: {user ? user.email : me.email}</p>
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