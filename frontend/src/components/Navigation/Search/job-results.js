

function JobResults({ result, additionalInfo, jobId, setJobId, setAdditionalInfo, user }) {

    return (
        <>
        <div className='job-results'>
            <div className='job-result-info'>
                <p>{result.title} for {result.Company ? result.Company.name : 'Contract'}</p>
                {additionalInfo && jobId === result.id && (
                    <div className='job-additional-info'>
                        <p>Location: {result.location}</p>
                        <p>Pays: ${result.pay}</p>
                        <p>Posted: {new Date(result.createdAt).toDateString()}</p>
                        <p>Posted by: {result.User.first_name + ' ' + result.User.last_name}</p>
                        <p>Description: <br></br> {result.description}</p>
                        {result.Requirements && (
                            <div className='job-requirements'>
                                <p>Requirements: </p>
                                {result.Requirements.map(requirement => (
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
                {result.Company && (
                    <>
                    {additionalInfo && jobId === result.id && (
                        <div>
                            <p className='applicants'>{result.Applications.length} applicants</p>
                            <p>Email: {result.Company.email}</p>
                            <p>Phone: {result.Company.phone}</p>
                            <p>Founded: {new Date(result.Company.founded).toDateString()}</p>
                        </div>
                    )}
                    </>
                )}
                {!result.Company && (
                    <>
                    {additionalInfo && (
                        <>
                        <div className='job-company-info'>
                            <div className='profile-images'>
                                <div className='background-image-container'>
                                    <img alt='company' className='company-background' src={user.background_image}></img>
                                </div>
                                <img className='profile-image' src={user.profile_picture} alt='profile'></img>
                            </div>
                        </div>
                        <div>
                            <p className='applicants'>{result.Applications?.length} applicants</p>
                            <p>Email: {user.email}</p>
                        </div>
                        </>
                    )}
                    </>
                )}
            <div>
                <button className={additionalInfo ? 'selected' : 'post-button'} onClick={() => {
                    setJobId(result.id)
                    setAdditionalInfo(!additionalInfo)
                }}>{additionalInfo ? 'Less Info' : 'More Info'}</button>
            </div>
            </div>
        </div>
            </>
    )
}

export default JobResults;