import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import "../HomePage.css";
import React, { useState, useEffect } from 'react';

const CollectionTable = ({ cards }) => {
  const currentCardsRange = [0, 1, 2, 3, 4];
  const currentCardsRange2 = [5, 6, 7, 8, 9];

  if(cards.length > 0) {
    

    return (
      <div className="main-conteiner-cards">
        <h1>Our best collections</h1>
        <div className="conteiner-collections-tables">

          <div className='conteiner-collections-tables-div line-separeted'>

            <div className="table-collection-main">
              <div className="table-collection-main-left">
                <span>Colections</span>
              </div>

              <div className="table-collection-main-rigth">
                <span>Floor Price</span>
                <span>Volumen</span>
              </div>
            </div>

            {currentCardsRange.map(index => {
              let floorPrice = 100, volumen = 0;
              cards[index].nfts?.map(nft => { if(nft.price < floorPrice) floorPrice = nft.price })
              cards[index].nfts?.map(nft => { volumen = nft.price + volumen })

              return (
                <Link to={`/collections/${cards[index].id}`} className="nolink">
                  <div className="table-collection-main">

                    <div className="table-collection-main-left">
                      <span>{index + 1}</span>
                      <img className="table-collection-image" src={cards[index].image} alt="img-collections" />
                        <div className="table-collection-name-conteiner">
                          <VerifiedIcon />
                          <h6 className="table-collection-name"> {cards[index].name} </h6>
                        </div>
                    </div>

                    <div className="table-collection-main-rigth">
                        <h6 className="table-collection-floor"> {" "} {floorPrice.toFixed(3)} <span>ETH</span></h6>
                        <h6 className="table-collection-volumen"> {" "} {volumen.toFixed(3)} <span>ETH</span></h6>
                    </div>

                  </div>
                </Link>
              )
              
          })}
          </div>

          <div className='conteiner-collections-tables-div'>

            <div className="table-collection-main">
              <div className="table-collection-main-left">
                <span>Colections</span>
              </div>

              <div className="table-collection-main-rigth">
                <span>Floor Price</span>
                <span>Volumen</span>
              </div>
            </div>

            {currentCardsRange2.map(index => {

              let floorPrice = 100, volumen = 0;
              cards[index].nfts?.map(nft => { if(nft.price < floorPrice) floorPrice = nft.price })
              cards[index].nfts?.map(nft => { volumen = nft.price + volumen })

              return (
                <Link to={`/collections/${cards[index].id}`} className="nolink">
                  <div className="table-collection-main">

                    <div className="table-collection-main-left">
                      <span>{index + 1}</span>
                      <img className="table-collection-image" src={cards[index].image} alt="img-collections" />
                        <div className="table-collection-name-conteiner">
                          <VerifiedIcon />
                          <h6 className="table-collection-name"> {cards[index].name} </h6>
                        </div>
                    </div>

                    <div className="table-collection-main-rigth">
                        <h6 className="table-collection-floor"> {" "} {floorPrice.toFixed(3)} <span>ETH</span></h6>
                        <h6 className="table-collection-volumen"> {" "} {volumen.toFixed(3)} <span>ETH</span></h6>
                    </div>

                  </div>
                </Link>
              )

              })}
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