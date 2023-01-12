import * as actions from "../../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortIcon from "@mui/icons-material/Sort";
import Offcanvas from "react-bootstrap/Offcanvas";
import * as helpers from "./OrderingHelpers"

import styles from "./stylesheets/Ordering.module.css";
import { createFilterOptions, formHelperTextClasses } from "@mui/material";

export default function Ordering() {
  //estos estados son para cambiar el estilo.
  const [option, setOption]= useState("");
  const [showOrders, setShowOrders] = useState(false);
  const  isDark  = useSelector((state) => state.activeThemeIsDark);
  const [arrowUp, setArrowUp] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

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
      <SortIcon className="sort-icon" style={ isDark ? { color: "#fafafa" } :  { color: "#212121" } } fontSize="large" onClick={handleShow} />
      <Offcanvas
        show={showOrders}
        onHide={handleClose}
        placement={"start"}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
