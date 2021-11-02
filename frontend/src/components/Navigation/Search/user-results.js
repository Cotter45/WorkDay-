import { useState } from 'react';
import { useHistory } from 'react-router-dom';


function UserResults({ result, additionalInfo, setAdditionalInfo, users, userId, setUserId }) {
    const history = useHistory();

    return (
        <>
        <div className='company-result'>
            <div className='company-result-info'>
                <p>{result.first_name + ' ' + result.last_name}</p>
                {additionalInfo && userId === result.id && (
                    <>
                        <p>Email: {result.email}</p>
                        <p>Phone: {result.location}</p>
                        <p>{result.description}</p>
                    </>
                )}
            </div>
            <div className='app-buttons'>
                {additionalInfo && userId === result.id && (
                    <button onClick={() => history.push(`/profile/${result.id}`)} className='post-button'>Visit Page</button>
                )}
                <button className={additionalInfo && userId === result.id ? 'selected' : 'post-button'} onClick={() => {
                    if (!additionalInfo) {
                        setUserId(result.id)
                        setAdditionalInfo(!additionalInfo)
                    } else if (additionalInfo && userId === result.id) {
                        setUserId(result.id)
                        setAdditionalInfo(false)
                    } else {
                        setUserId(result.id)
                        setAdditionalInfo(true)
                    }
                }}>{additionalInfo && userId === result.id ? 'Less Info' : 'More Info'}</button>
            </div>
        </div>
        </>
    )
}

export default UserResults;