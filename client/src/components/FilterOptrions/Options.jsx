import * as actions from "../../redux/actions";
import Ordering from "./Ordering/Ordering";
import Filtering from "./Filtering/Filtering";
import PriceSelector from "./PriceSelector/PriceSelector";
import NFTSPerPageSelector from "./NFTSPerPageSelector/NFTSPerPageSelector";
import { useDispatch } from "react-redux";
import "./Options.css";

export default function Options() {
  const dispatch = useDispatch();

  return (
    <div className="alllFilters-container">
      <Ordering />
      <Filtering />
      <PriceSelector />
      {/* <NFTSPerPageSelector/> */}
      <div className="options-container">
        <button
          className="resetfilters-btn"
          onClick={() => {
            dispatch(actions.resetFilters());
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
