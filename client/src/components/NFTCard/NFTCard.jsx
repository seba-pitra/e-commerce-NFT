import { Link } from "react-router-dom";
import "./NFTCard.css";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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
    <div className="cardContainer">
      <Link className="link" to={`/details/${props.id}`}>
        {/*coloque un link rodeando a todo el card para que cuando el usuario hace click en **la tarjeta... lo lleve al detalle del nft** */}

        {/*estructura de la tarjeta del nft*/}
        <div className="nftCard-image-info">
          <div className="nftCard-img-container">
            <img
              className={"nftImage"}
              src={`${
                props.image === "no image found"
                  ? "https://preview.redd.it/j82jl2vpg4n71.jpg?auto=webp&s=e8431005571759e9fd9b5cd2e82dd27696d0b6c4"
                  : props.image
              }`}
              alt="nft-preview"
            />
          </div>

          <div className={"bottom-img-info"}>
            <div className="nftCard-nameToken">
              {/* horizontal div */}
              <h3>{props.name}</h3>
              <h4>{props.tokenId}</h4>
            </div>
            <div>
              <h3>floor price: {props.price}</h3>
              <h4>Usd: ${(props.price * 1271).toFixed(2)}</h4>
            </div>
          </div>
          <div className="CardButtons">
            <div className="nftCard-icon-container">
              {/* <FavoriteIcon /> */}
              <FavoriteIcon />
            </div>
            <div className="nftCard-icon-container">
              {/* <FavoriteIcon /> */}
              <ShoppingCartIcon />
            </div>
            {/* <img src="" alt="add-to-favs" />
          <img src="" alt="shopping-cart" /> */}
          </div>
        </div>
        {/* <h3>Last sale: falta esto</h3> */}
        <div className="CardButtons">
        <img src="" alt="add-to-favs" />
        <img src="" alt="shopping-cart" />
        </div>
      </Link>
    </div>
  );
}
