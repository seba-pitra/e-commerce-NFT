// import * as actions from "../actions/actions.js";
import "./PurchaseHistory.css";

const PurchaseHistory = ({ props }) => {
  //price,statusPay,purchases
  return (
    <div className="detail-shopping-history">
      {props ? (
        <div className="history-title-container">
          <div className="sale">Sale Price</div>
          <div className="from">From</div>
          <div className="to">To</div>
          <div className="date">Date</div>
        </div>
      ) : (
        <div>There isn't shopping history</div>
      )}

      {props &&
        props.map((elem, index) => {
          return(
          <div 
            key={index}
            className="history-title-container">
            <div className="sale">{elem.price} Eth</div>
            <div className="from">{elem.contract}</div>
            <div className="to">{elem.contract}</div>
            <div className="date">{elem.createdAt}</div>
          </div>)
        })} 
    </div>
  );
};

export default PurchaseHistory;
