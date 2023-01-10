import * as actions from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  //funcion de busqueda
  function search(e) {
    e.preventDefault();
    dispatch(actions.filterName(searchQuery)); //resetea los filtos
    setSearchQuery("");
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={search} className="search-bar-component">
        <input
          className="search-input"
          type="text"
          placeholder="Look for your nft"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" id="search-btn" type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
