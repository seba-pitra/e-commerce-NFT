import * as actions from "../../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./Ordering.css";

export default function Ordering() {
  //estos estados son para cambiar el estilo.
  const [nameOrderUp, setNameOrderUp] = useState(true);
  const [priceOrderUp, setPriceOrderUp] = useState(true);
  const [rarityOrderUp, setRarityOrderUp] = useState(true);
  const [favsOrderUp, setFavsOrderUp] = useState(true);
  const [starsOrderUp, setStarsOrderUp] = useState(true);
  const [lastBuyOrderUp, setLastBuyOrderUp] = useState(true);
  const [createdTsOrderUp, setCreatedTsOrderUp] = useState(true);

  // const [amountOrderUp, setAmountOrderUp] = useState(true);
  // const [releaseOrderUp, setReleaseOrderUp] = useState(true);

  const dispatch = useDispatch();

  const orderByName = () => {
    setNameOrderUp(!nameOrderUp);
    dispatch(actions.changeOrderDirection());
    dispatch(actions.orderName());
  };

  const orderByPrice = () => {
    setPriceOrderUp(!priceOrderUp);
    dispatch(actions.changeOrderDirection());
    dispatch(actions.orderPrice());
  };

  const orderByRarity = () => {
    setRarityOrderUp(!rarityOrderUp);
    dispatch(actions.changeOrderDirection());
    dispatch(actions.orderRarity());
  };

  const orderByFavs = () => {
    setFavsOrderUp(!favsOrderUp);
    dispatch(actions.changeOrderDirection());
    dispatch(actions.orderFavs());
  };

  const orderByStars = () => {
    setStarsOrderUp(!starsOrderUp);
    dispatch(actions.changeOrderDirection());
    dispatch(actions.orderStars());
  };

  const orderByLastBuy = () => {
    setLastBuyOrderUp(!lastBuyOrderUp);
    dispatch(actions.changeOrderDirection());
    dispatch(actions.orderLastBuy());
  };

  const orderByCreatedTs = () => {
    setCreatedTsOrderUp(!createdTsOrderUp);
    dispatch(actions.changeOrderDirection());
    dispatch(actions.orderCreatedTs());
  };

  // const orderByAmount = () => {
  //     setAmountOrderUp(!amountOrderUp)
  //     dispatch(actions.changeOrderDirection())
  //     dispatch(actions.orderAmount())
  // }

  // const orderByRelease  = () => {
  //     setReleaseOrderUp(!releaseOrderUp)
  //     dispatch(actions.changeOrderDirection())
  //     dispatch(actions.orderCreatedAt())
  // }

  return (
    <div className="options-container">
      {/* <label id="order-by-label" className="label" htmlFor="order">
        Ordenar Por:{" "}
      </label> */}
      <div className="button-list">
        {/*Boton para elegir orden alfabetico*/}
        <button
          id="name-option"
          className={nameOrderUp ? "btn-order-down" : "btn-order-up"}
          onClick={() => orderByName()}
        >
          Name
          {
            nameOrderUp ? 
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon> :
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          }
        </button>
        {/*boton para elegir orden por rating*/}
        <button
          id="price-option"
          className={priceOrderUp ? "btn-order-down" : "btn-order-up"}
          onClick={() => orderByPrice()}
        >
          Price
          {
            priceOrderUp ? 
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon> :
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          }
        </button>
        <button
          id="rarity-option"
          className={rarityOrderUp ? "btn-order-down" : "btn-order-up"}
          onClick={() => orderByRarity()}
        >
          Rarity
          {
            rarityOrderUp ? 
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon> :
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          }
        </button>
        <button
          id="favs-option"
          className={favsOrderUp ? "btn-order-down" : "btn-order-up"}
          onClick={() => orderByFavs()}
        >
          Favs
          {
            favsOrderUp ? 
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon> :
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          }
        </button>

        <button
          id="stars-option"
          className={starsOrderUp ? "btn-order-down" : "btn-order-up"}
          onClick={() => orderByStars()}
        >
          Stars
          {
            starsOrderUp ? 
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon> :
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          }
        </button>

        <button
          id="lastbuy-option"
          className={lastBuyOrderUp ? "btn-order-down" : "btn-order-up"}
          onClick={() => orderByLastBuy()}
        >
          LastBuy
          {
            lastBuyOrderUp ? 
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon> :
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          }
        </button>

        <button
          id="createdts-option"
          className={createdTsOrderUp ? "btn-order-down" : "btn-order-up"}
          onClick={() => orderByCreatedTs()}
        >
          Created At
          {
            createdTsOrderUp ? 
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon> :
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          }
        </button>
        {/* <button
                    id='amount-option'
                    className={amountOrderUp ? 'btn-order-up' : 'btn-order-down'}
                    onClick={()=> orderByAmount()}
                    >Amount</button>
                <button
                    id='releasedate-option'
                    className={releaseOrderUp ? 'btn-order-up' : 'btn-order-down'}
                    onClick={()=> orderByRelease()}
                    >Creation Date</button> */}
        {/*boton para cambiar de orden descendente a ascendente y visceversa*/}
        {/* <button 
                    className='option-btn button-order'
                    dangerouslySetInnerHTML={{ __html: currentArrowState ? '&#8648;' : '&#8650;'}} 
                    onClick={(e)=> reverseAndOrder(e)}></button> */}
      </div>
    </div>
  );
}
