import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import "../HomePage.css";
import React, { useState, useEffect } from 'react';

const CollectionTable = ({ cards }) => {
  const currentCardsRange = [0, 1, 2, 3, 4];
  const currentCardsRange2 = [5, 6, 7, 8, 9];

  if(cards.length > 0) {
    let floorPrice = 100
    cards[0].nfts?.map(nft => { if(nft.price < floorPrice) floorPrice = nft.price })

    return (
      <div className="main-conteiner-cards">
        <div className="conteiner-collections-tables">

          <div className='conteiner-collections-tables-div'>
            {currentCardsRange.map(index => (
              <Link to={`/collections/${cards[index].id}`} className="nolink">
              <div className="table-collection-main">
                <img className="table-collection-image" src={cards[index].image} alt="img-collections" />
                <div>
                  <div className="table-collection-name-conteiner">
                    <VerifiedIcon />
                    <h3 className="table-collection-name"> {cards[index].name} </h3>
                  </div>
                  <h3 className="table-collection-floor"> {" "} Floor Price ETH: {floorPrice.toFixed(3)} </h3>
                  <h3 className="table-collection-volumen"> {" "} Volumen ETH: {floorPrice.toFixed(3)} </h3>
                </div>
              </div>
              </Link>
            ))}
          </div>

          <div className='conteiner-collections-tables-div'>
            {currentCardsRange2.map(index => (
              <Link to={`/collections/${cards[index].id}`} className="nolink">
              <div className="table-collection-main">
                <img className="table-collection-image" src={cards[index].image} alt="img-collections" />
                <div>
                  <div className="table-collection-name-conteiner">
                    <VerifiedIcon />
                    <h3 className="table-collection-name"> {cards[index].name} </h3>
                  </div>
                  <h3 className="table-collection-floor"> {" "} Floor Price ETH: {floorPrice.toFixed(3)} </h3>
                  <h3 className="table-collection-volumen"> {" "} Volumen ETH: {floorPrice.toFixed(3)} </h3>
                </div>
              </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    );
  }
  return (
    <>
    </>
  )
};

export default CollectionTable;