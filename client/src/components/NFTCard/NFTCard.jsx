import { Link } from "react-router-dom";
import card from './NFTCard.css';

export default function NFTCard(props) {
  //{
  // id,
  // price,
  // image,
  // type,
  // contract,
  // last price,
  //tokenId

  //}
  //faltaria transformar precio eth a usd en el momento
  return (
    <div className={card.cardContainer}>
      {/*coloque un link rodeando a todo el card para que cuando el usuario hace click en **la tarjeta... lo lleve al detalle del nft** */}

      <Link className="link" to={`/details/${props.id}`}>
        {/*estructura de la tarjeta del nft*/}

        <img className={card.nftImage} src={props.image} alt="nft-image" />
        
        <div className={card.nameAndToken}>
            {/* horizontal div */}
          <h3>{props.name}</h3>
          <h4>{props.tokenId}</h4>
        </div>
        <h3>{props.price}</h3>
        {/* <h3>Last sale: falta esto</h3> */}
        <div className={card.CardButtons}>
        <img src="" alt="add-to-favs" />
        <img src="" alt="shopping-cart" />
        </div>
      </Link>
    </div>
  );
}
