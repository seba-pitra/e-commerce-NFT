import * as actions from "../../redux/actions";
import Filtering from "./Filtering/Filtering";
import { useDispatch } from "react-redux";
import styles from "./stylesheets/Option.module.css";

export default function Options() {
  const dispatch = useDispatch();

  return (
    <div className={styles["all-filters-container"]}>
      <Filtering />
      {/* <div className="options-container">
        <button
          className="resetfilters-btn"
          onClick={() => {
            dispatch(actions.resetFilters());
          }}
        >
          Reset Filters
        </button>
      </div> */}
    </div>
  );
}
