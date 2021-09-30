import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


import './myjobs.css';
import ProfileCard from '../Feed/profile-card';
import { get_data, job_application, save_job } from '../../store/api';
import Applications from './applications';
import SavedJobs from './savedjobs';
import Jobs from '../Jobs/jobs';
import Applicants from './applicants';


function MyJobs({ user_id, isLoaded, setIsLoaded }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const myApplications = useSelector(state => state.data.applications);
    const mySaves = useSelector(state => state.data.saved_jobs);
    const stateJobs = useSelector(state => state.data.jobs);

    const [viewMyApps, setViewMyApps] = useState(true);
    const [viewSaved, setViewSaved] = useState(false);
    const [viewPosted, setViewPosted] = useState(false);
    const [reviewApps, setReviewApps] = useState(false);

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [jobId, setJobId] = useState('');
    const [apps, setApps] = useState(myApplications);
    const [savedJobs, setSavedJobs] = useState(mySaves);

    const [update, setUpdate] = useState(false);
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        if (!user) return;
        if (isLoaded) return;
        (async function stuff() {
            await dispatch(get_data(user.id));
        })()
        setIsLoaded(true);
    }, [dispatch, isLoaded, setIsLoaded])

    useEffect(() => {
        if (savedJobs.length) return;
        if (mySaves.length) {
            setSavedJobs(mySaves);
        }
    }, [mySaves, savedJobs.length])

    useEffect(() => {
        if (!update) return;
        setApps(myApplications);
        setUpdate(!update)
    }, [myApplications, update])

    useEffect(() => {
        if (apps.length) return;
        if (myApplications.length) {
            setApps(myApplications);
        }
    }, [apps, myApplications])

    const visitProfile = () => {
        history.push(`/profile/${user.id}/posts`)
    }

    const deleteApp = async () => {
        const application = {
            job_id: jobId,
            user_id: user.id 
        }
        await dispatch(job_application(application));
        await dispatch(get_data(user.id));
        setUpdate(!update);
    }

    const deleteSave = async () => {
        const save = {
            job_id: jobId,
            user_id: user.id 
        }

        await dispatch(save_job(save))
        await dispatch(get_data(user.id));
        setUpdate(!update);
    }

    const refresh = async () => {
        setLoaded(false);
        await dispatch(get_data(user_id));
        setLoaded(true);
        // setUpdate(!update)
        // setApps(myApplications)
    }

    return (
        <>
        {isLoaded && (
            <div className='myjobs-main-container'>
                <div className='myjobs-container'>
                    <div className='left-columns'>
                        <div className='menu'>
                            <div onClick={() => {
                                setViewMyApps(true)
                                setViewSaved(false)
                                setViewPosted(false)
                                setReviewApps(false)
                            }} className={viewMyApps ? 'highlight' : 'menu-tabs'}>
                                <i className="far fa-money-bill-alt"></i>
                                <p>My Applications</p>
                            </div>
                            <div onClick={() => {
                                setViewMyApps(false)
                                setViewSaved(true)
                                setViewPosted(false)
                                setReviewApps(false)
                            }} className={viewSaved ? 'highlight' : 'menu-tabs'}>
                                <i className="fas fa-bookmark"></i>
                                <p> Saved Jobs</p>
                            </div>
                            <div onClick={() => {
                                setViewMyApps(false)
                                setViewSaved(false)
                                setViewPosted(true)
                                setReviewApps(false)
                            }} className={viewPosted ? 'highlight' : 'menu-tabs'}>
                                <i className="fas fa-briefcase"></i>
                                <p> Posted Jobs</p>
                            </div>
                            <div onClick={() => {
                                setViewMyApps(false)
                                setViewSaved(false)
                                setViewPosted(false)
                                setReviewApps(true)
                            }} className={reviewApps ? 'highlight' : 'menu-tabs'}>
                                <i className="fas fa-user-check"></i>
                                <p> Review Applicants</p>
                            </div>
                        </div>
                        <ProfileCard visitProfile={visitProfile} user={user} />
                    </div>
                    <div className='right-columns'>
                        {!loaded && (
                            <div className='loading'></div>
                        )}
                        <button className='refresh-button' onClick={refresh}><i className="fas fa-sync-alt"></i></button>
                        {viewMyApps && (
                            <Applications 
                                apps={apps} 
                                additionalInfo={additionalInfo} 
                                jobId={jobId} 
                                stateJobs={stateJobs} 
                                deleteApp={deleteApp} 
                                setJobId={setJobId} 
                                setAdditionalInfo={setAdditionalInfo} />
                        )}
                        {viewSaved && (
                            <SavedJobs 
                                deleteSave={deleteSave}
                                stateJobs={stateJobs}
                                additionalInfo={additionalInfo}
                                jobId={jobId}
                                setJobId={setJobId}
                                setAdditionalInfo={setAdditionalInfo}
                                savedJobs={savedJobs} />
                        )}
                        {viewPosted && (
                            <Jobs 
                                viewPosted={viewPosted}
                            />
                        )}
                        {reviewApps && (
                            <Applicants 

                            />
                        )}
                    </div>
                </div>
            </div>
        )} 
        </>
    )
}

export default MyJobs;