import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update_job } from '../../store/api';

import Jobs from "../Jobs/jobs";


function EditJob({ job, setShowModal, setUpdate, update }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [title, setTitle] = useState(job.title);
    const [location,setLocation] = useState(job.location);
    const [pay, setPay] = useState(job.pay);
    const [description, setDescription] = useState(job.description);
    const [requirements, setRequirements] = useState(job.Requirements.map(req => req.requirement));
    const [temp, setTemp] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const edit = {
            title,
            description,
            location,
            pay,
            company_id: job.Company.id,
            poster_id: user.id,
            requirements
        }
        
        await dispatch(update_job(edit, job.id));
        setUpdate(true);
        setShowModal(false);
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
                        {requirements.map((requirement, index) => (
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
                {job.Company && (
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
                {!job.Company && (
                    <div className='job-column'>
                        <div className='job-company-info'>
                            <div className='profile-images'>
                                <div className='background-image-container'>
                                    <img alt='company' className='company-background' src={job.User.background_image}></img>
                                </div>
                                <img className='profile-image' src={job.User.profile_picture} alt='profile'></img>
                            </div>
                        </div>
                        <div>
                            <p className='applicants'>{job.Applications.length} applicants</p>
                            <p>Email: {job.User.email}</p>
                            <p>Phone: {job.User.phone}</p>
                        </div>
                    </div>
                    
                )}
            </div>
            <div className='edit-post-buttons'>
                <button onClick={handleSubmit} className='submit' disabled={errors.length ? true : false}>Submit</button>
                <button className='delete'>Delete</button>
            </div>
        </div>
    )
}

export default EditJob;