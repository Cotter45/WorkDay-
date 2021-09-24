import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CreateJobModal from '../CreateJobModal';

import EditJobModal from '../EditJobModal';

import './jobs.css';

function Jobs({ jobs }) {

    const user = useSelector(state => state.session.user);

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [update, setUpdate] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);


    return (
        <div className='jobs-main-container'>
            <>
            <div className='new-post-button'>
                <CreateJobModal update={update} setUpdate={setUpdate} showModal={showModal1} setShowModal={setShowModal1} />
            </div>
            {jobs && jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(job => (
                <div key={job.id} className='job-container'>
                    {job.poster_id === user.id && (
                        <EditJobModal createPost={showModal1} showModal={showModal2} setShowModal={setShowModal2} update={update} setUpdate={setUpdate} job={job} />
                    )}
                    <div className='job-info'>
                        <p>{job.title} for {job.Company ? job.Company.name : 'Contract'}</p>
                        <p>Location: {job.location}</p>
                        <p>Pays: ${job.pay}</p>
                        <p>Posted: {new Date(job.createdAt).toDateString()}</p>
                        {additionalInfo && (
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
                        {additionalInfo && (
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
                            <button className='post-button' onClick={() => setAdditionalInfo(!additionalInfo)}>{additionalInfo ? 'Less Info' : 'More Info'}</button>
                        </div>
                    </div>
                </div>
            ))}
            </>
        </div>
    )
}

export default Jobs;