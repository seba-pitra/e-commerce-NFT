import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const CollectionCarousel = ({ cards }) => {
  const [currentCardsRange, setCurrentCardsRange] = useState([0, 1, 2]);

  const handleNextClick = () => {
    const nextRange = [currentCardsRange[0] + 3, currentCardsRange[1] + 3, currentCardsRange[2] + 3];
<<<<<<< HEAD
    if (nextRange[2] > cards.length +1) setCurrentCardsRange([0, 1, 2]);
=======
    console.log(nextRange)
    if (nextRange[2] > cards.length) setCurrentCardsRange([0, 1, 2]);
>>>>>>> origin/development
    else setCurrentCardsRange(nextRange);
  };

  const handlePrevClick = () => {
    const prevRange = [currentCardsRange[0] - 3, currentCardsRange[1] - 3, currentCardsRange[2] - 3];
    if (prevRange[0] < 0) setCurrentCardsRange([cards.length - 3, cards.length - 2, cards.length - 1]);
    else setCurrentCardsRange(prevRange);
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 15000);
    return () => clearInterval(interval);
  }, []);

  if(cards.length > 0) {
    

    return (
      <div className="main-conteiner-cards">
        <div className="conteiner-cards-buttons collections-buttons">
          <button onClick={handlePrevClick}>{"<"}</button>
          <div className='conteiner-collections'>
            {currentCardsRange.map(index => {
              
              let floorPrice = 100
              cards[index].nfts?.map(nft => { if(nft.price < floorPrice) floorPrice = nft.price })
              
              return (
                <Link to={`/collections/${cards[index].id}`} className="nolink">
                  <div className="collections-conteiner">
                    <img className="collections-img-main" src={cards[index].image} alt="img-collections" />

                    <div className="name-floor-conteiner">
                        <div className="collection-name-conteiner">
                          <VerifiedIcon />
                          <h6 className="collections-name"> {cards[index].name} </h6>
                        </div>
                        <h6 className="collections-name"> {" "} Floor: {floorPrice.toFixed(3)} ETH</h6>
                    </div>

                  </div>
                </Link>
              )
            })}
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