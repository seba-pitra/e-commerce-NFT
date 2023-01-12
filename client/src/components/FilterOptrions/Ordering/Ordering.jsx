import * as actions from "../../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortIcon from "@mui/icons-material/Sort";
import Offcanvas from "react-bootstrap/Offcanvas";
import * as helpers from "./OrderingHelpers"

import styles from "./stylesheets/Ordering.module.css";
import { formHelperTextClasses } from "@mui/material";

export default function Ordering() {
  //estos estados son para cambiar el estilo.
  const [option, setOption]= useState("");
  const [showOrders, setShowOrders] = useState(false);
  const  isDark  = useSelector((state) => state.activeThemeIsDark);
  const orderDirection = useSelector((state) => state.orderDirection);

  const handleClose = () => setShowOrders(false);
  const handleShow = () => {
    setShowOrders(true);
  };

  // const [amountOrderUp, setAmountOrderUp] = useState(true);
  // const [releaseOrderUp, setReleaseOrderUp] = useState(true);

  const dispatch = useDispatch();

  const changeOrderDirection = (option) => {
    dispatch(actions.changeOrderDirection());
    helpers.orderOptionDispatcher(dispatch, option);
  };

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
              className={
                nameOrderUp ? styles["btn-order-down"] : styles["btn-order-up"]
              }
              onClick={() => changeOrderDirection()}
            >
              {orderDirection ? (
                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
              ) : (
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              )}
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
        <select name="" id="">
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
    </div>
  );
}
