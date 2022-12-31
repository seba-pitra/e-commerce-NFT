import * as actions from '../../redux/actions'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SearchBar.css'

function SearchBar(){
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();


    //funcion de busqueda
    function search(e){
        console.log(searchQuery)
        e.preventDefault();
        dispatch(actions.filterName(searchQuery)) //resetea los filtos
        setSearchQuery("");
    }

    return (
        <div className='search-bar-container'>    
	        <form onSubmit={search} className='search-bar-component'>
                <input
                    className="search-input
                        brand-colorized-border-color
                        brand-colorized-background-color
                        brand-colorized-text"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    />
                <button 
                    className="search-button"
                    id="search-btn"
                    type="submit">
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
