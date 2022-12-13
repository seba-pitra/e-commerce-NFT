import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NFTList_dash.css";
import * as actions from "../../../redux/actions/index";

// Components
import NFTsCard_dash from "../NFTsCard_dash/NFTsCard_dash";
import { useState } from "react";

const NFTList_dash = () => {
  const { nfts } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [cp, setCp] = useState(0);
  const [nftsxPage, setNFTsxPage] = useState(10);
  const [displayNFTs, setDisplayNFTs] = useState([]);

  useEffect(() => {
    dispatch(actions.getAllNfts());
  }, [dispatch]);

  useEffect(() => {
    setDisplayNFTs(nfts.slice(cp * nftsxPage, cp * nftsxPage + nftsxPage));
  }, [nfts, cp]);

  const handdleClick = (e) => {
    e.preventDefault();
    console.log(nfts);
  };

  const incrementCp = (e) => {
    e.preventDefault();
    setCp(cp + 1);
  };

  const decrementCp = (e) => {
    e.preventDefault();
    setCp(cp - 1);
  };

  if (!nfts.length) return <h1>Loading</h1>;
  return (
    <div>
      soy list
      <button onClick={handdleClick}>Click me pls</button>
      <div className="dash-nfts-list">
        {displayNFTs.map((nft) => (
          <NFTsCard_dash
            key={nft.id}
            id={nft.id}
            name={nft.name}
            price={nft.price}
            userId={nft.userId || "null"}
          />
        ))}
      </div>
      <div>
        <button onClick={decrementCp} disabled={cp == 0}>
          {"<"}
        </button>
        <button
          onClick={incrementCp}
          disabled={cp * nftsxPage + nftsxPage >= nfts.length}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default NFTList_dash;
