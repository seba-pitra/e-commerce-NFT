import * as actions from '../../redux/actions'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SearchBar.css'

function SearchBar(){
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();


    //funcion de busqueda
    function search(e){
        e.preventDefault();
        /* dispatch(actions.resetFilters()) //resetea los filtos
        dispatch(actions.searchNFT(searchQuery)); //y manda el query al action de busqueda */
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
                        placeholder="Nombre..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        />
                    <button 
                        id="search-btn"
                        type="submit">
                        Buscar
                    </button>
            </form>
        </div>
    );
}

export default SearchBar;