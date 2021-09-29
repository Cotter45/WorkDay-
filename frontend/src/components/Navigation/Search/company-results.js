import { useState } from 'react';

function CompanyResults({ result, additionalInfo, setAdditionalInfo, companies }) {

    const [companyId, setCompanyId] = useState('');

    return (
        <>
        <div className='company-result'>
            <div className='company-result-info'>
                <p>{result.name}</p>
                {additionalInfo  && (
                    <>
                        <p>{result.num_employees} employees</p>
                        <p>Email: {result.email}</p>
                        <p>Phone: {result.phone}</p>
                        <p>Founded: {new Date(result.founded).toDateString()}</p>
                    </>
                )}
            </div>
            <div>
                <button className={additionalInfo ? 'selected' : 'post-button'} onClick={() => {
                    setCompanyId(result.id)
                    setAdditionalInfo(!additionalInfo)
                }}>{additionalInfo ? 'Less Info' : 'More Info'}</button>
            </div>
        </div>
        </>
    )
}

export default CompanyResults;