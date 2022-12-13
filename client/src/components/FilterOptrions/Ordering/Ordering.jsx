import * as actions from "../../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Ordering.css";

export default function Ordering() {
  //estos estados son para cambiar el estilo.
  const [nameOrderUp, setNameOrderUp] = useState(true);
  const [priceOrderUp, setPriceOrderUp] = useState(true);
  const [amountOrderUp, setAmountOrderUp] = useState(true);
  const [releaseOrderUp, setReleaseOrderUp] = useState(true);

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
      <label id="order-by-label" className="label" htmlFor="order">
        Ordenar Por:{" "}
      </label>
      <div className="button-list">
        {/*Boton para elegir orden alfabetico*/}
        <button
          id="name-option"
          className={nameOrderUp ? "btn-order-up" : "btn-order-down"}
          onClick={() => orderByName()}
        >
          Name
        </button>
        {/*boton para elegir orden por rating*/}
        <button
          id="price-option"
          className={priceOrderUp ? "btn-order-up" : "btn-order-down"}
          onClick={() => orderByPrice()}
        >
          Price
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
