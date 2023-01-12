import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import lightStyles from "../stylesheets/LightHomePage.module.css";
import darkStyles from "../stylesheets/DarkHomePage.module.css";
import useStyles from "../../../customHooks/useStyles";

const CollectionTable = ({ cards }) => {
  const styles = useStyles(darkStyles, lightStyles);
  const currentCardsRange = [0, 1, 2, 3, 4];
  const currentCardsRange2 = [5, 6, 7, 8, 9];

  if (cards.length > 0) {
    return (
      <div className={styles["main-conteiner-cards"]}>
        <h1>Our best collections</h1>
        <div className={styles["conteiner-collections-tables"]}>
          <div className={styles["conteiner-collections-tables-left-div"]}>
            {/* <div className="conteiner-collections-tables-div line-separeted"> */}

            <div className={styles["table-collection-main"]}>
              <div className={styles["table-collection-main-left"]}>
                <span>Collections</span>
              </div>

              <div className={styles["table-collection-main-rigth"]}>
                <span>Floor Price</span>
                <span>Volumen</span>
              </div>
            </div>

            {currentCardsRange.map((index) => {
              let floorPrice = 100,
                volumen = 0;
              cards[index].nfts?.map((nft) => {
                if (nft.price < floorPrice) floorPrice = nft.price;
              });
              cards[index].nfts?.map((nft) => {
                volumen = nft.price + volumen;
              });

              return (
                <Link
                  to={`/collections/${cards[index].id}`}
                  className={styles["nolink"]}
                >
                  <div className={styles["table-collection-main"]}>
                    <div className={styles["table-collection-main-left"]}>
                      <span>{index + 1}</span>
                      <img
                        className={styles["table-collection-image"]}
                        src={cards[index].image}
                        alt="img-collections"
                      />
                      <div
                        className={styles["table-collection-name-conteiner"]}
                      >
                        <VerifiedIcon />
                        <h6 className={styles["table-collection-name"]}>
                          {cards[index].name}
                        </h6>
                      </div>
                    </div>

                    <div className={styles["table-collection-main-rigth"]}>
                      <h6 className={styles["table-collection-floor"]}>
                        {floorPrice.toFixed(3)} <span>ETH</span>
                      </h6>
                      <h6 className={styles["table-collection-volumen"]}>
                        {volumen.toFixed(3)} <span>ETH</span>
                      </h6>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className={styles["conteiner-collections-tables-right-div"]}>
            <div className={styles["table-collection-main"]}>
              <div className={styles["table-collection-main-left"]}>
                <span
                  className={
                    styles["table-collection-main-left-colections-span"]
                  }
                >
                  Collections
                </span>
              </div>

              <div className={styles["table-collection-main-rigth"]}>
                <span className={styles["table-collection-main-rigth-price"]}>
                  Floor Price
                </span>
                <span className={styles["table-collection-main-rigth-price"]}>
                  Volumen
                </span>
              </div>
            </div>

            {currentCardsRange2.map((index) => {
              let floorPrice = 100,
                volumen = 0;
              cards[index].nfts?.map((nft) => {
                if (nft.price < floorPrice) floorPrice = nft.price;
              });
              cards[index].nfts?.map((nft) => {
                volumen = nft.price + volumen;
              });

              return (
                <Link
                  to={`/collections/${cards[index].id}`}
                  className={styles["nolink"]}
                >
                  <div className={styles["table-collection-main"]}>
                    <div className={styles["table-collection-main-left"]}>
                      <span>{index + 1}</span>
                      <img
                        className={styles["table-collection-image"]}
                        src={cards[index].image}
                        alt="img-collections"
                      />
                      <div
                        className={styles["table-collection-name-conteiner"]}
                      >
                        <VerifiedIcon />
                        <h6 className={styles["table-collection-name"]}>
                          {cards[index].name}
                        </h6>
                      </div>
                    </div>

                    <div className={styles["table-collection-main-rigth"]}>
                      <h6 className={styles["table-collection-floor"]}>
                        {floorPrice.toFixed(3)} <span>ETH</span>
                      </h6>
                      <h6 className={styles["table-collection-volumen"]}>
                        {volumen.toFixed(3)} <span>ETH</span>
                      </h6>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default CollectionTable;
