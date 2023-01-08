import React, { useState, useEffect } from 'react';
import NFTCard2 from '../../NFTCard/NFTCard2';

const CardCarousel = ({ cards }) => {
  const [currentCardsRange, setCurrentCardsRange] = useState([0, 1, 2, 3]);

  const handleNextClick = () => {
    const nextRange = [currentCardsRange[0] + 4, currentCardsRange[1] + 4, currentCardsRange[2] + 4, currentCardsRange[3] + 4];
    if (nextRange[3] > cards.length) setCurrentCardsRange([0, 1, 2, 3]);
    else setCurrentCardsRange(nextRange);
  };

  const handlePrevClick = () => {
    const prevRange = [currentCardsRange[0] - 4, currentCardsRange[1] - 4, currentCardsRange[2] - 4, currentCardsRange[3] - 4];
    if (prevRange[0] < 0) setCurrentCardsRange([cards.length - 4, cards.length - 3, cards.length - 2, cards.length - 1]);
    else setCurrentCardsRange(prevRange);
  };

  const handlePageClick = pageIndex => {
    setCurrentCardsRange([pageIndex, pageIndex + 1, pageIndex + 2, pageIndex + 3]);
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 7000);
    return () => clearInterval(interval);
  }, []);

  if(cards.length > 0) {
    return (
      <div className="main-conteiner-cards">
			  <h1>Rareest Nfts</h1>
        <div className="conteiner-cards-buttons">
          <button onClick={handlePrevClick}>{"<"}</button>
          <div className='conteiner-cards'>
            {currentCardsRange.map(index => (
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

  return (
    <>
    </>
  )
};

export default CardCarousel;