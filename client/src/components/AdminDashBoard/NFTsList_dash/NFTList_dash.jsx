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
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  useEffect(() => {
    dispatch(actions.getAllNfts());
  }, [dispatch]);

  useEffect(() => {
    setDisplayNFTs(
      filteredNFTs.slice(cp * nftsxPage, cp * nftsxPage + nftsxPage)
    );
  }, [filteredNFTs, cp, nftsxPage]);

  useEffect(() => {
    setFilteredNFTs(nfts);
  }, [nfts]);

  const search = (e) => {
    let nftsxName = nfts.filter((nft) =>
      nft.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (cp !== 0) setCp(0);
    setFilteredNFTs(nftsxName);
  };

  const handleShowChange = (e) => {
    setNFTsxPage(e.target.value);
  };

  const handdleClick = (e) => {
    e.preventDefault();
    console.log(nfts, filteredNFTs);
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
    <div className="nfts-dash-container">
      soy list
      <button onClick={handdleClick}>Click me pls</button>
      <div>
        <label htmlFor="">Search: </label>
        <input onChange={search} type="text" />
      </div>
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
        <label htmlFor="nftsxPage">Show: </label>
        <select onChange={handleShowChange} name="nftsxPage">
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
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
