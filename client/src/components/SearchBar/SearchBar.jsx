import * as actions from '../../redux/actions'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import search_icon from '../../images/utils/search_icon.png'

function SearchBar(){
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();


    //funcion de busqueda
    function search(e){
        e.preventDefault();
        dispatch(actions.resetFilters()) //resetea los filtos
        dispatch(actions.searchNFT(searchQuery)); //y manda el query al action de busqueda
        setSearchQuery("");
    }

    return (
        <div className='search-bar-container'>    
            <form onSubmit={search} className='search-bar-component'>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Nombre..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        />
                    <button 
                        id="search-btn"
                        type="submit">
                        <img 
                            className="search-icon"
                            src={search_icon}
                            alt="" />
                    </button>
            </form>
        </div>
    );
}

export default SearchBar;