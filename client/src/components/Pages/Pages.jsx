import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import Ordering from "../FilterOptrions/Ordering/Ordering";
import PageSelector from "../PageSelector/PageSelector";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import ImageIcon from "@mui/icons-material/Image";
import Offcanvas from "react-bootstrap/Offcanvas";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterOptions from "../FilterOptrions/Options";
import { useState } from "react";
import Filtering from "../FilterOptrions/Filtering/Filtering";

//dark-light theme
import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkPages.module.css"
import lightStyles from "./stylesheets/LightPages.module.css"

function Pages() {
  const filteredNfts = useSelector((state) => state.filteredNfts);
  const activePage = useSelector((state) => state.activePage);
  const nftsPerPage = useSelector((state) => state.nftsPerPage);
  const lastNftInPage = activePage * nftsPerPage;
  const firstNftInPage = lastNftInPage - nftsPerPage;
  const nftsInPage = filteredNfts.slice(firstNftInPage, lastNftInPage);

  const styles = useStyles(darkStyles, lightStyles);

  const dispatch = useDispatch();

  const setViewCards = (view) => {
    dispatch(actions.setViewCards(view))
  };

  const setNftPage = (e) => {
    dispatch(actions.nftsxpage(e.target.value))
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

  let navToShow;
  //The nav content depends of the user's screen width.
  if (window.screen.width > 975) {
    //If the widht is less than 957
    const containerDesktop = (
      <div className={styles["orders-container"]}>

        <div className={styles["left-hand-conteiner"]}>
          <Filtering />
          <select defaultValue="itemsxpage" onChange={(e) => setNftPage(e)}>
            <option disabled value="itemsxpage"> Items-Page </option>
            <option value="40">40</option>
            <option value="80">80</option>
            <option value="120">120</option>
            <option value="160">160</option>
            <option value="200">200</option>
          </select>
        </div>
        

        <div className={styles["middle-conteiner"]}>
          <PageSelector />
        </div>

        <div className={styles["right-hand-conteiner"]}>
          <Ordering />
          <div className={styles["cards-styles"]}>
            <button className={styles["buttons-cards-styles"]} onClick={() => setViewCards("clear")} >
              <ImageIcon />
            </button>
            <button className={styles["buttons-cards-styles"]} onClick={() => setViewCards("info")} >
              <SubtitlesIcon />
            </button>
          </div>

          <span className={styles["amount-nfts"]}>
            <b>{filteredNfts.length}</b> items
          </span>
        </div>
      </div>
    );
    navToShow = containerDesktop;
  } else {
    // If the widht is greater than 957
    const containerPhone = (
      <div className={styles["orders-container-phone"]}>
        <div className={styles["orders-container"]}>

          <div className={styles["left-hand-conteiner"]}>
            <Filtering />
          </div>

          <div className={styles["right-hand-conteiner"]}>
            <Ordering />
            <div className={styles["cards-styles"]}>
              <button className={styles["buttons-cards-styles"]} onClick={() => setViewCards("clear")} >
                <ImageIcon />
              </button>
              <button className={styles["buttons-cards-styles"]} onClick={() => setViewCards("info")} >
                <SubtitlesIcon />
              </button>
            </div>
            {/* <span className={styles["amount-nfts"]}>
              <b>{filteredNfts.length}</b> items
            </span> */}
          </div>
        </div>
        <div className={styles["middle-conteiner"]}>
          <PageSelector />
        </div>
      </div>
    );
    navToShow = containerPhone;
  }


// el primer div className condicional para el tema
  return (
    <div> 
     {cards.length === 0 ? (
          <div className={styles["pages-all-container"]}>
            {navToShow}
            <div className={styles["cards-container"]}><NotFoundResults /></div>
          </div>
      ) : (
          <div className={styles["pages-all-container"]}>
            {navToShow}
            <div className={styles["cards-container"]}>{cards}</div>
          </div>
      )}
    </div>
  );
}

export default Pages;
