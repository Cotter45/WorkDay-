import { set } from 'js-cookie';
import { useState } from 'react';
import CompanyResults from './company-results';
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
                {result.name && (
                    <CompanyResults result={result} additionalInfo={additionalInfo} setAdditionalInfo={setAdditionalInfo} companies={companies} />
                )}
            </div>
        ))}
        {results && jobs && results.filter(result => result.title !== undefined).map(result => (
            <div className='results-container' key={uuidv4()}>
                <JobResults result={result} additionalInfo={additionalInfo} jobId={jobId} setJobId={setJobId} setAdditionalInfo={setAdditionalInfo} user={result.User} />
            </div>
        ))}
        {results && companies && results.filter(result => result.name !== undefined).map(result => (
            <div className='results-container' key={uuidv4()}>
                <CompanyResults result={result} additionalInfo={additionalInfo} setAdditionalInfo={setAdditionalInfo} companies={companies} />
            </div>
        ))}
        </>
    )
}

export default Results;