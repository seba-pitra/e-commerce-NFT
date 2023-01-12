import darkStyles from "./stylesheets/DarkPurchaseHistory.module.css";
import lightStyles from "./stylesheets/LightPurchaseHistory.module.css";
import useStyles from "../../customHooks/useStyles";

const PurchaseHistory = ({ purchases, sales }) => {
  const styles = useStyles(darkStyles, lightStyles);

  let convert = (data) => {
    let dateString = data;
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString().replace(",", "");
    return formattedDate;
  };

  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles["responsive-table"]}>
        <table className={styles["table"]}>
          <thead>
            <tr className={styles["tr"]}>
              <th className={styles["col"]} scope="col">
                Transaction Type
              </th>
              <th className={styles["col"]} scope="col">
                Price
              </th>
              <th className={styles["col"]} scope="col">
                Purchase Date
              </th>
              <th className={styles["col"]} scope="col">
                Payment Method
              </th>
            </tr>
          </thead>
          <tbody>
            {purchases &&
              purchases.map((elem) => {
                return (
                  <tr>
                    <td>Purchase</td>
                    <td>{elem.price} </td>
                    <td>{convert(elem.updatedAt)}</td>
                    <td>{elem.payMethod}</td>
                  </tr>
                );
              })}
            {sales &&
              sales.map((elem) => {
                return (
                  <tr>
                    <td>Sale</td>
                    <td>{elem.price}</td>
                    <td>{convert(elem.updatedAt)}</td>
                    <td>{elem.payMethod}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
