import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../../store/api';

import '../Navigation.css';

function Search({ param, setParams, setResults, setSearch, searchBar }) {
    const dispatch = useDispatch();

    const search_results = useSelector(state => state.data.search);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (param.length <= 1) {
            setResults([]);
            setSearch(false);
            return;
        }
        const debounce = setTimeout(() => {
            dispatch(search(param));
            setSearch(true);
            setResults(search_results);
        }, 500)

        return () => clearTimeout(debounce);
    }, [dispatch, param])


    return (
        <>
        {user && searchBar && (
            <div>
                <input
                    className='search'
                    placeholder='Search'
                    onFocus={() => setSearch(true)}
                    onChange={(e) => setParams(e.target.value)}
                    value={param}
                ></input>
            </div>
        )}
        </>
    )
}

export default Search;