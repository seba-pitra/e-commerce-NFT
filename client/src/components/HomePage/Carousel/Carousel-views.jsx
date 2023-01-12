import React, { useState, useEffect } from "react";
import NFTCard2 from "../../NFTCard/NFTCard2";

import darkStyles from "../stylesheets/DarkHomePage.module.css";
import lightStyles from "../stylesheets/LightHomePage.module.css";
import useStyles from "../../../customHooks/useStyles";

const CardCarousel = ({ cards }) => {
  const styles = useStyles(darkStyles, lightStyles);
  const [currentCardsRange, setCurrentCardsRange] = useState([0, 1, 2, 3]);

  const handleNextClick = () => {
    const nextRange = [
      currentCardsRange[0] + 4,
      currentCardsRange[1] + 4,
      currentCardsRange[2] + 4,
      currentCardsRange[3] + 4,
    ];
    if (nextRange[3] > cards.length) setCurrentCardsRange([0, 1, 2, 3]);
    else setCurrentCardsRange(nextRange);
  };

  const handlePrevClick = () => {
    const prevRange = [
      currentCardsRange[0] - 4,
      currentCardsRange[1] - 4,
      currentCardsRange[2] - 4,
      currentCardsRange[3] - 4,
    ];
    if (prevRange[0] < 0)
      setCurrentCardsRange([
        cards.length - 4,
        cards.length - 3,
        cards.length - 2,
        cards.length - 1,
      ]);
    else setCurrentCardsRange(prevRange);
  };

  const handlePageClick = (pageIndex) => {
    setCurrentCardsRange([
      pageIndex,
      pageIndex + 1,
      pageIndex + 2,
      pageIndex + 3,
    ]);
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 15000);
    return () => clearInterval(interval);
  }, []);

  // className={styles[]}

  if (cards.length > 0) {
    return (
      <div className={styles["main-conteiner-cards"]}>
        <h1>Most Viewed Nfts</h1>
        <div className={styles["conteiner-cards-buttons"]}>
          <button
            className={styles["carrousel-button"]}
            onClick={handlePrevClick}
          >
            {"<"}
          </button>

          <div className={styles["conteiner-cards"]}>
            {currentCardsRange.map((index) => (
              <NFTCard2
                key={cards[index]?.id}
                collectionId={cards[index]?.collectionId}
                contract={cards[index]?.contract}
                id={cards[index]?.id}
                image={cards[index]?.image}
                name={cards[index]?.name}
                price={cards[index]?.price}
                tokenId={cards[index]?.tokenId}
                userId={cards[index]?.userId}
                rarity={cards[index]?.rarity}
                favs={cards[index]?.favs}
                stars={cards[index]?.stars}
                lastBuy={cards[index]?.lastBuyValue || 0.01}
              />
            ))}
          </div>

          <button onClick={handleNextClick}>{">"}</button>
        </div>
      </div>
    );
  }

  return <></>;
};

export default CardCarousel;
