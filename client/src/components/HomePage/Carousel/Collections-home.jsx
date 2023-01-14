import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import lightStyles from "../stylesheets/LightHomePage.module.css";
import darkStyles from "../stylesheets/DarkHomePage.module.css";
import useStyles from "../../../customHooks/useStyles";

const CollectionCarousel = ({ cards }) => {
  const styles = useStyles(darkStyles, lightStyles);
  const [currentCardsRange, setCurrentCardsRange] = useState([0, 1, 2]);

  const handleNextClick = () => {
    const nextRange = [
      currentCardsRange[0] + 3,
      currentCardsRange[1] + 3,
      currentCardsRange[2] + 3,
    ];
    console.log(nextRange);
    if (nextRange[2] > cards.length) setCurrentCardsRange([0, 1, 2]);
    else setCurrentCardsRange(nextRange);
  };

  const handlePrevClick = () => {
    const prevRange = [
      currentCardsRange[0] - 3,
      currentCardsRange[1] - 3,
      currentCardsRange[2] - 3,
    ];
    if (prevRange[0] < 0)
      setCurrentCardsRange([
        cards.length - 3,
        cards.length - 2,
        cards.length - 1,
      ]);
    else setCurrentCardsRange(prevRange);
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 15000);
    return () => clearInterval(interval);
  }, []);

  if (cards.length > 0) {
    return (
      <div className={styles["main-conteiner-cards-collections"]}>
        {/* ACA ESTA EL ERROR */}
        <div className={styles["conteiner-collections-buttons"]}>
          {/* DE LAS FLECHITAS. Es el nombre de la clase */}
          <button className={styles["button-left"]} onClick={handlePrevClick}>{"<"}</button>
          <div className={styles["conteiner-collections"]}>
            {currentCardsRange.map((index) => {
              let floorPrice = 100;
              cards[index].nfts?.map((nft) => {
                if (nft.price < floorPrice) floorPrice = nft.price;
              });

              return (
                <Link
                  to={`/collections/${cards[index].id}`}
                  className={styles["nolink"]}
                >
                  <div className={styles["collections-conteiner"]}>
                    <img
                      className={styles["collections-img-main"]}
                      src={cards[index].image}
                      alt="img-collections"
                    />

                    <div className={styles["name-floor-conteiner"]}>
                      <div className={styles["collection-name-conteiner"]}>
                        <VerifiedIcon />
                        <h6 className={styles["collections-name"]}>
                          {cards[index].name}
                        </h6>
                      </div>
                      <h6 className={styles["collections-name"]}>
                        Floor: {floorPrice.toFixed(3)} ETH
                      </h6>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <button className={styles["button-right"]} onClick={handleNextClick}>{">"}</button>
        </div>
      </div>
    );
  }
  return <></>;
};

export default CollectionCarousel;
