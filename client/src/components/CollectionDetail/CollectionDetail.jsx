// import * as actions from '../../redux/actions'
import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import PageSelector from "../PageSelector/PageSelector";
// import { useEffect } from 'react'; 
// import { useDispatch } from "react-redux";
// import Loading from '../Loading/Loading';
import { useParams } from "react-router-dom";
import styles from "./CollectionDetail.module.css";

const CollectionDetail = () => {
  const { id } = useParams()
  
  const nfts = useSelector((state) => state.nfts);
  const collections = useSelector((state) => state.collections);

  const foundNfts = nfts.filter(nft => nft.collectionId === id)
  const foundCollection = collections.find(coll => coll.id === id)

  console.log("NFTS", foundNfts);
  console.log("COLLECTION", foundCollection);
  
  const cards = foundNfts.map((nft) => {
    return (
      <NFTCard
        key={nft.id}
        collectionId={nft.collectionId}
        contract={nft.contract}
        id={nft.id}
        image={nft.image}
        name={nft.name}
        price={nft.price}
        tokenId={nft.tokenId}
        userId={nft.userId}
      />
    );
  });

  return (
    <div>
      {cards.length === 0 ? (
        <NotFoundResults />
      ) : (
        <>
          <img src={foundCollection.image} alt="" />
          <h1>{foundCollection.name}</h1>
          <div className="pageSelector-Container">{cards}</div>
          
        </>
      )}
    </div>
  );
}

export default CollectionDetail;