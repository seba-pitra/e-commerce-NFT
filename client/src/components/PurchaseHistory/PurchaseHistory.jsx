import * as actions from "../actions/actions.js";


const PurchaseHistory = (props) => {
  
  
  return (
    <div className="detail-shopping-history">
      
      
      {history ? (

        <div className="history-title-container">
          <div className="sale">Sale Price</div>
          <div className="from">From</div>
          <div className="to">To</div>
          <div className="date">Date</div>
        </div>
      ) : (
        <div>There isn't shopping history</div>
      )}

      {history &&
        history.map((elem) => {
          <div className="history-title-container">
            <div className="sale">Sale Price</div>
            <div className="from">From</div>
            <div className="to">To</div>
            <div className="date">Date</div>
          </div>;
        })}
    </div>
  );
};

export default PurchaseHistory;
