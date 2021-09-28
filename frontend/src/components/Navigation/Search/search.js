import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { search } from '../../../store/api';

import '../Navigation.css';

function Search({ param, setParams, setResults, setSearch }) {
    const dispatch = useDispatch();

    const search_results = useSelector(state => state.data.search);

    useEffect(() => {
        if (param.length <= 1) {
            setResults([]);
            setSearch(false);
            return;
        }

        dispatch(search(param));
        setSearch(true);
        setResults(search_results);
        
    }, [dispatch, param])


    return (
        <div>
            <input
                className='search'
                placeholder='Search'
                onFocus={() => setSearch(true)}
                onChange={(e) => setParams(e.target.value)}
                value={param}
            ></input>
        </div>
    )
}

export default Search;