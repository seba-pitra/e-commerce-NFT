import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import s from "./Details.css";

function Details(props) {
  //{image, name, id, owner, price, lastSale,viewsCount,SalesHistory}
  const { id } = props.match.params;
  const nftDetail = useSelector((state) => state.nftDetail);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getNftDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        // si esta cargando muestra el componente de carga caso contrario muestra la el componente de detalle.
        isLoading ? (
          <Loading />
        ) : (
          <div className={s.detailsContainer}>
            {/*link to go back to home*/}
            <Link className="link" to="/home">
              <button className="details-go-back-btn">&#x3c;</button>
            </Link>

            {/*aca va la estructura del detalle del nft*/}

            <div className={s.imageNftContainer}>
              <div className="borderImgItems">
                {/* podria ir cant de likes y el nombre en cada esquina como openSea */}
              </div>
              <img src={nftDetail.image} alt="nft-image" />
            </div>
            <div className={s.details}>
              <h1>
                {nftDetail.name} {nftDetail.tokenId}
              </h1>
              {/* <h2>
                Property of : {nftDetail.source.name}/
                {nftDetail.userId && <h2>ID : {nftDetail.userId}</h2>}
              </h2> */}
 {/*              <img src={nftDetail.source.icon} alt="owner-icon" /> */}
              <h4>Type: {nftDetail.type}</h4>
              <h3>Price : {nftDetail.price}</h3>
              {nftDetail.collectionId && (
                <h3>Collection ID : {nftDetail.collectionId}</h3>
              )}
              <div className="viewsAndFavs">
                {/* faltaria views */}
                {/* {props.viewsCount} */}
              </div>
              <div className="lastSaleContainer">
                {/* falta la info ,se podria hacer la funcion que guarde eso */}
              </div>
            </div>
            <div className="description"></div>
            <div className="price-history">
              {/* aca deberia ir todos los precios que tuvo este nft,con fechas */}
            </div>
            {/* meaby a "more items like this " div */}
          </div>
        )
      }
    </>
  );
}

export default Details;
