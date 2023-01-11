import { useState } from "react";
import * as actions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./stylesheets/PriceSelector.module.css";

const App = () => {
  const dispatch = useDispatch();

  const [range, setRange] = useState({
    min: 0.0,
    max: 0.0,
    currency: null,
  });

  const currencies = ["ETH", "USD", "ARS"];

  const handleMinChange = (e) => {
    setRange({ ...range, min: parseFloat(e.target.value) });
  };
  const handleMaxChange = (e) => {
    setRange({ ...range, max: parseFloat(e.target.value) });
  };

  const handleCurrencyClick = (e) => {
    setRange({ ...range, currency: e.target.value });
  };

  const handleRangeSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.setPrice(range));
    dispatch(actions.filterNfts());
  };

  // className={styles[]}

  return (
    <form
      className={styles["filters-price-container"]}
      onSubmit={(e) => handleRangeSubmit(e)}
    >
      <label>Price : </label>
      <select
        onChange={(e) => {
          handleCurrencyClick(e);
        }}
      >
        <option disabled value="price">
          Select currency
        </option>
        {currencies.map((currency, index) => {
          return (
            <option key={index} value={currency}>
              {currency}
            </option>
          );
        })} 
      </select>
      <div className={styles["max-min-container"]}>
        <div>
          <label htmlFor="min">Min: </label>
          <input
            name="min"
            type="number"
            placeholder="min"
            value={range.min}
            onChange={(e) => handleMinChange(e)}
            min="0"
            step="0.00001"
          />
        </div>
        <div>
          <label htmlFor="max">Max: </label>
          <input
            name="max"
            type="number"
            value={range.max}
            onChange={(e) => handleMaxChange(e)}
            min={range.min}
            step="0.00001"
          />
        </div>
      </div>
      <input type="submit" value="Apply" />
    </form>
  );
};

export default App;
