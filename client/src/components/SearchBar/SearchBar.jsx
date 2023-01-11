import * as actions from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
// import styles from "./stylesheets/SearchBar.module.css";
import darkStyles from "./stylesheets/DarkSearchBar.module.css";
import lightStyles from "./stylesheets/LightSearchBar.module.css";
import useStyles from "../../customHooks/useStyles";
import { useLocation } from "react-router-dom";

function SearchBar() {

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const styles = useStyles(darkStyles, lightStyles);

  const dispatch = useDispatch();

  

  //funcion de busqueda
  function search(e) {
    if(location.pathname === "/collections") {
      e.preventDefault();
      dispatch(actions.filterCollectionName(searchQuery));
      setSearchQuery("");
    }
    else{
      e.preventDefault();
       //resetea los filtos
       dispatch(actions.filterName(searchQuery)); //resetea los filtos
      setSearchQuery("");
    }
  }

  // className={styles[]}

  return (
    <div className={styles["search-bar-container"]}>
      <form onSubmit={search} className={styles["search-bar-component"]}>
        <input
          className={styles["search-input"]}
          type="text"
          placeholder="Look for your NFT"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles["search-button"]} type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
