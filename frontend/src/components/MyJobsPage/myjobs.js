import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


import './myjobs.css';
import ProfileCard from '../Feed/profile-card';
import { get_data, get_jobs, get_job_data, job_application, save_job } from '../../store/api';
import Applications from './applications';
import SavedJobs from './savedjobs';
import Jobs from '../Jobs/jobs';
import Applicants from './applicants';
import RecentJobs from './recentJobs';
import useWindowSize from '../../util/window-size';


function MyJobs({ user_id, isLoaded, setIsLoaded }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { width, height } = useWindowSize();

    const user = useSelector(state => state.session.user);
    const apps = useSelector(state => state.data.applications);
    const savedJobs = useSelector(state => state.data.saved_jobs);
    const stateJobs = useSelector(state => state.data.jobs);

    const [viewRecent, setViewRecent] = useState(true);
    const [viewMyApps, setViewMyApps] = useState(false);
    const [viewSaved, setViewSaved] = useState(false);
    const [viewPosted, setViewPosted] = useState(false);
    const [reviewApps, setReviewApps] = useState(false);

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [jobId, setJobId] = useState('');

    const [update, setUpdate] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!user) return;
        if (loaded) return;
        dispatch(get_job_data(user.id));
        setLoaded(true)
    }, [dispatch, loaded, user])

    // useEffect(() => {
    //     if (!user) return;
    //     if (stateJobs.length) return;
    //     dispatch(get_job_data(user.id));
    //     setLoaded(true)
    // }, [dispatch, stateJobs, user])

    const visitProfile = () => {
        history.push(`/profile/${user.id}/posts`)
    }

    const deleteApp = async () => {
        const application = {
            job_id: jobId,
            user_id: user.id 
        }
        await dispatch(job_application(application));
        // await dispatch(get_job_data(user.id));
        setUpdate(!update);
    }

    const deleteSave = async () => {
        const save = {
            job_id: jobId,
            user_id: user.id 
        }

        await dispatch(save_job(save))
        // await dispatch(get_job_data(user.id));
        setUpdate(!update);
    }

    const refresh = async () => {
        setLoaded(false);
        await dispatch(get_job_data(user_id));
        await dispatch(get_jobs());
        await dispatch(get_data(user.id));
        setLoaded(true);
    }

    return (
        <>
        {isLoaded && (
            <div className='myjobs-main-container'>
                <div className='myjobs-container'>
                    <div className={width > 750 ? 'left-columns' : 'bottom-columns'}>
                        <div className={width > 750 ? 'menu' : 'bottom-menu'}>
                            <div onClick={() => {
                                setViewRecent(true)
                                setViewMyApps(false)
                                setViewSaved(false)
                                setViewPosted(false)
                                setReviewApps(false)
                            }} className={viewRecent ? 'highlight' : 'menu-tabs'}>
                                <i className="far fa-calendar-plus"></i>
                                <p className='tab-label'>Recent Posts</p>
                            </div>
                            <div onClick={() => {
                                setViewRecent(false)
                                setViewMyApps(true)
                                setViewSaved(false)
                                setViewPosted(false)
                                setReviewApps(false)
                            }} className={viewMyApps ? 'highlight' : 'menu-tabs'}>
                                <i className="far fa-money-bill-alt"></i>
                                <p className='tab-label'>My Applications</p>
                            </div>
                            <div onClick={() => {
                                setViewRecent(false)
                                setViewMyApps(false)
                                setViewSaved(true)
                                setViewPosted(false)
                                setReviewApps(false)
                            }} className={viewSaved ? 'highlight' : 'menu-tabs'}>
                                <i className="fas fa-bookmark"></i>
                                <p className='tab-label'>My Saved Jobs</p>
                            </div>
                            <div onClick={() => {
                                setViewRecent(false)
                                setViewMyApps(false)
                                setViewSaved(false)
                                setViewPosted(true)
                                setReviewApps(false)
                            }} className={viewPosted ? 'highlight' : 'menu-tabs'}>
                                <i className="fas fa-briefcase"></i>
                                <p className='tab-label'>My Posted Jobs</p>
                            </div>
                            <div onClick={() => {
                                setViewRecent(false)
                                setViewMyApps(false)
                                setViewSaved(false)
                                setViewPosted(false)
                                setReviewApps(true)
                            }} className={reviewApps ? 'highlight' : 'menu-tabs'}>
                                <i className="fas fa-user-check"></i>
                                <p className='tab-label'> Review Applicants</p>
                            </div>
                        </div>
                        {width > 750 && (
                            <ProfileCard visitProfile={visitProfile} user={user} />
                        )}
                    </div>
                    <div className='right-columns'>
                        {/* {!loaded && (
                            <div className='loading'></div>
                        )} */}
                        <button className='refresh-button' onClick={refresh}><i className="fas fa-sync-alt"></i></button>
                        {viewRecent && (
                            <RecentJobs />
                        )}
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
                                stateJobs={stateJobs}
                            />
                        )}
                        {reviewApps && (
                            <Applicants 
                                update={update}
                                setUpdate={setUpdate}
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