import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import Ordering from "../FilterOptrions/Ordering/Ordering";
import PageSelector from "../PageSelector/PageSelector";
// import "./Pages.css";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import ImageIcon from "@mui/icons-material/Image";
import MaterialUISwitch from "./switch";
import Offcanvas from "react-bootstrap/Offcanvas";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterOptions from "../FilterOptrions/Options";
import { useState } from "react";
import Filtering from "../FilterOptrions/Filtering/Filtering";

// THEME imports
import "./Pages.css"; // tema ligth
import "./Pages2.css"; // tema dark
import { toggleTheme } from "../../redux/actions";

function Pages() {
  const filteredNfts = useSelector((state) => state.filteredNfts);
  const activePage = useSelector((state) => state.activePage);
  const nftsPerPage = useSelector((state) => state.nftsPerPage);

  const lastNftInPage = activePage * nftsPerPage;
  const firstNftInPage = lastNftInPage - nftsPerPage;
  const nftsInPage = filteredNfts.slice(firstNftInPage, lastNftInPage);

  const [showFilters, setShowFilters] = useState(false);

  const handleClose = () => setShowFilters(false);
  const handleShow = () => {
    setShowFilters(true);
  };

  const dispatch = useDispatch();

  const setViewCards = (view) => {
    dispatch(actions.setViewCards(view));
  };

  const setNftPage = (e) => {
    dispatch(actions.nftsxpage(e.target.value));
  };

  const cards = nftsInPage.map((nft) => {
    return (
      <NFTCard
        key={nft.id}
        collectionId={nft.collectionId}
        contract={nft.contract}
        id={nft.id}
        image={nft.image}
        name={nft.name}
        price={nft.price}
        tokenId={nft.tokenId}
        userId={nft.userId}
        rarity={nft.rarity}
        favs={nft.favs}
        stars={nft.stars}
        lastBuy={nft.lastBuyValue || 0.01}
      />
    );
  });
  // THEME SWITCHER

  const activeThemeIsDark = useSelector((state) => state.activeThemeIsDark);

  const onSwitch = () => {
    dispatch(toggleTheme());
  };

  // el primer div className condicional para el tema
  return (
    <div className={activeThemeIsDark ? "dark" : "light"}>
      {cards.length === 0 ? (
        <NotFoundResults />
      ) : (
        <div className="pages-all-container">
          <div className="orders-container">
            <select onChange={(e) => setNftPage(e)}>
              <option disabled value="itemsxpage">Items-Page</option>
              <option value="40">40</option>
              <option value="80">80</option>
              <option value="120">120</option>
              <option value="160">160</option>
              <option value="200">200</option>
            </select>
            <Filtering />
            <Ordering />
            <MaterialUISwitch className="switch-dark-ligth" />
            <div className="cards-styles">
              <button
                className="buttons-cards-styles"
                onClick={() => setViewCards("clear")}
              >
                <ImageIcon />
              </button>
              <button
                className="buttons-cards-styles"
                onClick={() => setViewCards("info")}
              >
                <SubtitlesIcon />
              </button>
            </div>
          </div>

          {/* paginado va abajo */}
          <span className="amount-nfts">
            <b>{filteredNfts.length}</b> items
          </span>

          <PageSelector />
          <div className="pageSelector-Container">{cards}</div>
          <PageSelector />
        </div>
      )}
    </div>
  );
}

export default Pages;
