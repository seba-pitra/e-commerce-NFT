import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const CollectionCarousel = ({ cards }) => {
  const [currentCardsRange, setCurrentCardsRange] = useState([0, 1, 2]);

  const handleNextClick = () => {
    const nextRange = [currentCardsRange[0] + 3, currentCardsRange[1] + 3, currentCardsRange[2] + 3];
    if (nextRange[2] > cards.length +1) setCurrentCardsRange([0, 1, 2]);
    else setCurrentCardsRange(nextRange);
  };

  const handlePrevClick = () => {
    const prevRange = [currentCardsRange[0] - 3, currentCardsRange[1] - 3, currentCardsRange[2] - 3];
    if (prevRange[0] < 0) setCurrentCardsRange([cards.length - 3, cards.length - 2, cards.length - 1]);
    else setCurrentCardsRange(prevRange);
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 7000);
    return () => clearInterval(interval);
  }, []);

  if(cards.length > 0) {
    let floorPrice = 100
    cards[0].nfts?.map(nft => { if(nft.price < floorPrice) floorPrice = nft.price })

    return (
      <div className="main-conteiner-cards">
        <div className="conteiner-cards-buttons">
          <button onClick={handlePrevClick}>{"<"}</button>
          <div className='conteiner-collections'>
            {currentCardsRange.map(index => (
              <Link to={`/collections/${cards[index].id}`} className="nolink">
              <div className="collections-conteiner">
                <img className="collections-img-main" src={cards[index].image} alt="img-collections" />

                <div className="img-name-conteiner">
                  <img className="collections-img-owner" src={cards[index].nfts[0].image} alt="img-collections" />
                  <div>

                    <div className="collection-name-conteiner">
                      <VerifiedIcon />
                      <h3 className="collections-name"> {cards[index].name} </h3>
                    </div>
                    
                    <div className="collection-name-conteiner">
                      <h3 className="collections-name"> {" "} Floor Price ETH: {floorPrice.toFixed(3)} </h3>
                    </div>
                  </div>
                </div>

              </div>
              </Link>
            ))}
          </div>
          <button onClick={handleNextClick}>{">"}</button>
        </div>
      </div>
    );
  }
  return (
    <>
    </>
  )
};

export default CollectionCarousel;