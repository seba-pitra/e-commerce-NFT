import * as actions from "../../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as helpers from "./OrderingHelpers"
//dark-light theme
import useStyles from "../../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkOrdering.module.css"
import lightStyles from "./stylesheets/LightOrdering.module.css"


  
  export default function Ordering() {
  //estos estados son para cambiar el estilo.
  const [option, setOption]= useState("");
  const [showOrders, setShowOrders] = useState(false);
  const  isDark  = useSelector((state) => state.activeThemeIsDark);
  const [arrowUp, setArrowUp] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  const styles = useStyles(darkStyles, lightStyles);

  const handleClose = () => {
    setShowArrow(false);
    setShowOrders(false)
  };
  const handleShow = () => {
    setShowOrders(true);
  };

  const orderingOptions = [
                    "name",
                    "price",
                    "rarity",
                    "favs",
                    "stars",
                    "lastbuy",
                    "createdts",
                  ];

  const dispatch = useDispatch();

  const changeOrderDirection = (optionValue) => {
    setArrowUp(!arrowUp)
    dispatch(actions.changeOrderDirection());
    helpers.orderOptionDispatcher(dispatch, optionValue);
  };

  const selectOrderType = (e) =>{
    setShowArrow(true)
    setOption(e.target.value)
    helpers.orderOptionDispatcher(dispatch, e.target.value);
  }

  return (
    <div className={styles["sort-container"]}>
        <select 
          onChange={(e) => selectOrderType(e)}
          defaultValue="selectOrder" name="" id="">
          <option value="selectOrder" disabled hidden>Order By</option>
          {
            orderingOptions.map(option => {
              return <option 
                value={option}
                key={option}>
                  {option}
                </option>
            })
          }
        </select>
        <div className="button-list">
            <button
              id="name-option"
              className={showArrow ? "" : "noneDisplay"}
              onClick={(e) => changeOrderDirection(option)}
            >
              {arrowUp ? (
                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
              ) : (
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              )}
            </button>
          </div>
    </div>
  );
}
