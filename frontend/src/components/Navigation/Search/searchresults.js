import { useState } from 'react';
import JobResults from './job-results';

import './results.css';

function Results({ results, uuidv4, jobs, companies, users }) {

    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [jobId, setJobId] = useState('');

    return (
        <>
        {companies && (
            <div className='filters'>
                <div className='ranges'>
                    <label>Average Rating</label>
                    <input type='range'></input>
                </div>
                <div className='ranges'>
                    <label>Perks</label>
                    <input type='range'></input>
                </div>
                <div className='ranges'>
                    <label>Work Life Balance</label>
                    <input type='range'></input>
                </div>
            </div>
        )}
        {results && !jobs && !companies && !users && results.map(result => (
            <div className='results-container' key={uuidv4()}>
                {result.title && (
                    <JobResults result={result} additionalInfo={additionalInfo} jobId={jobId} setJobId={setJobId} setAdditionalInfo={setAdditionalInfo} user={result.User} />
                )}
                <div className='user-results'>
                    {result.first_name && (
                        <>
                        <p>{result.first_name + ' ' + result.last_name}</p>
                        </>
                    )}
                </div>
                <div className='company-results'>
                    {result.name && (
                        <>
                        <p>{result.name}</p>
                        </>
                    )}
                </div>
            </div>
        ))}
        {results && jobs && results.filter(result => result.title !== undefined).map(result => (
            <div className='results-container' key={uuidv4()}>
                <JobResults result={result} additionalInfo={additionalInfo} jobId={jobId} setJobId={setJobId} setAdditionalInfo={setAdditionalInfo} user={result.User} />
            </div>
        ))}
        </>
    )
}

export default Results;