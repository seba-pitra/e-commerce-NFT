import * as actions from '../actions/actions.js';




const PurchaseHistory =  (props) =>{
    // id user

   React.useEffect(()=>{
    dispatch(actions.getHistoryPurchase(props.id))
   },[])
    return(
        <div className="detail-shopping-history">
        
        <div className="creation-history">
          <div className="columns-name">
            <div>created By</div>
            <div>Date</div>
          </div>
        </div>

        {!history && <div>There isn't shopping history</div>}

        {history &&
          history.map((elem) => {
            <div>
              <div>Sale Price</div>
              <div>From</div>
              <div>To</div>
              <div>Date</div>
            </div>;
          })}
      </div>
    )
}

export default PurchaseHistory;