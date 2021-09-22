import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { job_search } from '../../store/api';

import './Navigation.css';

function JobSearch({ param, setParams, setResults, setSearch }) {
    const dispatch = useDispatch();

    const search_results = useSelector(state => state.data.job_search);

    

    useEffect(() => {
        if (param.length <= 1) {
            setResults([]);
            setSearch(false);
            return;
        }

        dispatch(job_search(param));
        setSearch(true);
        setResults(search_results);
    }, [dispatch, param])


    return (
        <div>
            <input
                placeholder='Search'
                onChange={(e) => setParams(e.target.value)}
                value={param}
            ></input>
        </div>
    )
}

export default JobSearch;