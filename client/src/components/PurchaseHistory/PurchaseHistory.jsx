// import * as actions from "../actions/actions.js";
import styles from "./stylesheets/PurchaseHistory.module.css";

const PurchaseHistory = ( {purchases,sales} ) => {
  console.log(purchases)
  let convert = (data) =>{
    let dateString = data;
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString().replace(',','');
    console.log(formattedDate);
    return formattedDate;
  }
  
  return (
    <div class="main-wrapper">
      <div class="responsive-table">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Transaction Type</th>
              <th scope="col">Price</th>
              <th scope="col">Purchase Date</th>
              <th scope="col">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {purchases && purchases.map(elem => {
              return(<tr>
                <td>Purchase</td>
                <td>{elem.price}</td>
                <td>
                  {convert(elem.updatedAt)}
                </td>
                <td>{elem.payMethod}</td>
              </tr>)
            })}
            {sales && sales.map(elem => {
              return(<tr>
                <td>Sale</td>
                <td>{elem.price}</td>
                <td>
                  {convert(elem.updatedAt)}
                </td>
                <td>{elem.payMethod}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
