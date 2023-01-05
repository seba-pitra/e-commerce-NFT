import React, { useState } from "react";
import { useEffect } from "react";
import "./NFTList_dash.css";

// Components
import NFTsCard_dash from "../NFTsCard_dash/NFTsCard_dash";
import UserCard_dash from "../UserCard_dash/UserCard_dash";
import VUserCard_dash from "../VUserCard_dash/VUserCard_dash";

const NFTList_dash = ({ users, nfts, verifyingUsers }) => {
  // const { nfts } = useSelector((state) => state);
  // const dispatch = useDispatch();

  const [cp, setCp] = useState(0);
  const [nftsxPage, setNFTsxPage] = useState(10);
  const [displayNFTs, setDisplayNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  // useEffect(() => {
  //   dispatch(actions.getAllNfts());
  // }, [dispatch]);

  useEffect(() => {
    setDisplayNFTs(
      filteredNFTs.slice(cp * nftsxPage, cp * nftsxPage + nftsxPage)
    );
  }, [filteredNFTs, cp, nftsxPage]);

  useEffect(() => {
    if (users) {
      setFilteredNFTs(users);
    } else if (verifyingUsers) {
      setFilteredNFTs(verifyingUsers);
    } else {
      setFilteredNFTs(nfts);
    }
  }, [nfts, users, verifyingUsers]);

  const search = (e) => {
    if (users) {
      let nftsxName = users.filter((user) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (cp !== 0) setCp(0);
      setFilteredNFTs(nftsxName);
    } else {
      let nftsxName = nfts.filter((nft) =>
        nft.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (cp !== 0) setCp(0);
      setFilteredNFTs(nftsxName);
    }
  };

  const handleShowChange = (e) => {
    setNFTsxPage(Number(e.target.value));
    setCp(0);
  };

  const incrementCp = (e) => {
    e.preventDefault();
    setCp(cp + 1);
  };

  const decrementCp = (e) => {
    e.preventDefault();
    setCp(cp - 1);
  };

  // if (!nfts.length) return <h1>Loading</h1>;
  return (
    <div className="nfts-dash-container">
      <div className="nft-dash-search-container">
        <label htmlFor="">Search by name: </label>
        <input onChange={search} type="text" />
      </div>
      {/* Conditional Div (nft/user) */}
      {users ? (
        <div className="dash-nfts-titles">
          <div className="dash-users-NameTitle">
            <p>Username</p>
          </div>
          <div className="dash-users-EmailTitle">
            <p>email</p>
          </div>
          <div className="dash-users-TypeTitle">
            <p>Type</p>
          </div>
        </div>
      ) : verifyingUsers ? (
        <div className="dash-nfts-titles">
          <div>
            <p>Name</p>
          </div>
          <div>
            <p>Last Name</p>
          </div>
          <div>
            <p>DNI</p>
          </div>
          <div>
            <p>Age</p>
          </div>
          <div>
            <p>PhoneNumber</p>
          </div>
          <div>
            <p>Nacionality</p>
          </div>
          <div>
            <p>Pp1</p>
          </div>
        </div>
      ) : (
        <div className="dash-nfts-titles">
          <div className="dash-nfts-idTitle">
            <p>id</p>
          </div>
          <div className="dash-nfts-NameTitle">
            <p>Name</p>
          </div>
          <div className="dash-nfts-PriceTitle">
            <p>Price</p>
          </div>
          <div className="dash-nfts-UserIdTitle">
            <p>UserId</p>
          </div>
        </div>
      )}

      {/* Conditional Div (nft/user) */}
      {/* Conditional Div (nft/user) */}
      {users ? (
        <div className="dash-nfts-list">
          {displayNFTs.map((user) => (
            <UserCard_dash
              id={user.id}
              username={user.username}
              email={user.email}
              type={user.type}
            />
          ))}
        </div>
      ) : verifyingUsers ? (
        <div>
          {verifyingUsers.map((user) => (
            <VUserCard_dash
              id={user.id}
              name={user.name}
              last_name={user.last_name}
              dni={user.dni}
              age={user.age}
              phoneNumber={user.phone_number}
              nacionality={user.nationality}
            />
          ))}
        </div>
      ) : (
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
      )}
      {/* Conditional Div (nft/user) */}
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
          disabled={cp * nftsxPage + nftsxPage >= filteredNFTs.length}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default NFTList_dash;
