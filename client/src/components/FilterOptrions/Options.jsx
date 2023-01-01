import * as actions from "../../redux/actions";
import Filtering from "./Filtering/Filtering";
import { useDispatch } from "react-redux";
import "./Options.css";

export default function Options() {
  const dispatch = useDispatch();

  return (
    <div className="alllFilters-container">
      <Filtering />
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
