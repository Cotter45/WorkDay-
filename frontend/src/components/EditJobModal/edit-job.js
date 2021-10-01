import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create_job, delete_job, update_job } from '../../store/api';



function EditJob({ job, setShowModal, setJobUpdate, jobUpdate, createPost }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const me = useSelector(state => state.data.users.find(dude => dude.id === user.id));

    const [title, setTitle] = useState(job?.title ? job.title : '');
    const [location,setLocation] = useState(job?.location ? job.location : '');
    const [pay, setPay] = useState(job?.pay ? job.pay : '');
    const [description, setDescription] = useState(job?.description ? job.description : '');
    const [requirements, setRequirements] = useState(job?.Requirements ? job.Requirements.map(req => req.requirement) : []);
    const [temp, setTemp] = useState('');
    const [errors, setErrors] = useState([]);
    const [freelance, setFreelance] = useState(me.Company ? false : true);
    const [corporate, setCorporate] = useState(false);
    const [company, setCompany] = useState(me.Company);

    useEffect(() => {
        let newErrors = [];

        if (createPost) {
            if (!freelance && !corporate && me.Company) {
                newErrors.push('You should let people know if this is a freelance gig or corporate job.')
            }
        }

        if (newErrors.length) setErrors(newErrors)
        else setErrors([])
    }, [corporate, createPost, freelance])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let edit;

        if (!createPost) {
            edit = {
                title,
                description,
                location,
                pay: +pay,
                company_id: job.Company?.id,
                poster_id: user.id,
                requirements
            }
        } else {
            edit = {
                title,
                description,
                location,
                pay: +pay,
                company_id: corporate ? company.id : null,
                poster_id: me.id,
                requirements
            }
        }
        
        if (!createPost) {
            await dispatch(update_job(edit, job.id));
            setJobUpdate(!jobUpdate);
            // setShowModal(false);
        } else {
            await dispatch(create_job(edit));
            setJobUpdate(!jobUpdate);
            setShowModal(false);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(delete_job(job.id));
        setJobUpdate(!jobUpdate);
    }

    return (
        <div className='job-modal'>
            <div className='job-container'>
                <form onSubmit={handleSubmit} className='job-form-info'>
                    <label>Title</label>
                    <input
                        type='text'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    <label>Location</label>
                    <input
                        type='text'
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        ></input>
                    <label>Pay</label>
                    <input
                        type='number'
                        value={pay}
                        onChange={(e) => setPay(e.target.value)}
                    ></input>
                    <label>Description</label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <label>Requirements:</label>
                    <div className='form-info-two'>
                        <input
                            value={temp}
                            onChange={(e) => setTemp(e.target.value)}
                        ></input>
                        <button
                            className='remove-requirement'
                            onClick={(e) => {
                                e.preventDefault()
                                setTemp('')
                                if(temp.length > 0) {
                                    setRequirements([...requirements, temp])
                                }
                            }}
                        ><i className="fas fa-plus"></i></button>
                    </div>
                    <div className='job-requirements'>
                        {requirements?.map((requirement, index) => (
                            <div className='edit-requirements' key={index}>
                                <li>{requirement}</li>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setRequirements(requirements.filter(req => req !== requirement))
                                    }}
                                    className='remove-requirement'>
                                    <i className="far fa-trash-alt" /></button>
                            </div>
                        ))}
                    </div>
                </form>
                <div className='inside-job-container'>
                <div>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </div>
                    {createPost && (
                        <>
                        <div className='post-buttons'>
                            <button className='post-button' onClick={() => {
                                setCorporate(false)
                                setFreelance(!freelance)
                            }}>Freelance</button>
                            {me.Company && (
                                <button className='post-button' onClick={() => {
                                    setFreelance(false)
                                    setCorporate(!corporate)
                                }}>Corporate</button>
                            )}
                        </div>
                        {!freelance && corporate && (
                            <div className='job-column'>
                                <div className='job-company-info'>
                                    <div className='profile-images'>
                                        <div className='background-image-container'>
                                            <img alt='company' className='company-background' src={company.background_image}></img>
                                        </div>
                                        <img className='profile-image' src={company.profile_picture} alt='profile'></img>
                                    </div>
                                </div>
                                <div>
                                    <p>Email: {company.email}</p>
                                    <p>Phone: {company.phone}</p>
                                    <p>Founded: {new Date(company.founded).toDateString()}</p>
                                </div>
                            </div>
                        )}
                        {!corporate && freelance && (
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
                        </>
                    )}
                    {!createPost && job && job.Company && (
                        <div className='job-column'>
                            <div className='job-company-info'>
                                <div className='profile-images'>
                                    <div className='background-image-container'>
                                        <img alt='company' className='company-background' src={job.Company.background_image}></img>
                                    </div>
                                    <img className='profile-image' src={job.Company.profile_picture} alt='profile'></img>
                                </div>
                            </div>
                            <div>
                                <p className='applicants'>{job.Applications.length} applicants</p>
                                <p>Email: {job.Company.email}</p>
                                <p>Phone: {job.Company.phone}</p>
                                <p>Founded: {new Date(job.Company.founded).toDateString()}</p>
                            </div>
                        </div>
                    )}
                    {!createPost && (!job || !job.Company) && (
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
                                <p className='applicants'>{job.Applications?.length} applicants</p>
                                <p>Email: {user.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='edit-post-buttons'>
                <button onClick={handleSubmit} className='submit' disabled={errors.length ? true : false}>Submit</button>
                {!createPost && (
                    <button onClick={handleDelete} className='delete'>Delete</button>
                )}
            </div>
        </div>
    )
}

export default EditJob;