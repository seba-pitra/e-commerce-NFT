import { React, useState } from "react";
import { freeShoppingCartState } from "../../redux/actions";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../images/logo/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Shoppingkart from "../Shoppingkart/Shoppingkart";
import Ufavorites from "../uFavorites/Ufavorites.jsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./NFTNav.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import UserIcon from "./UserIcon/UserIcon";


import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function NFTNav() {
  const [show, setShow] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const cartItemsCount = useSelector((state) => state.userNfts);
  const activeUserIs = useSelector((state) => state.activeUser);
  const userNfts = useSelector((state) => state.userNfts);
  const userFavorites = useSelector((state) => state.userFavs);
  const loggedUser = useSelector((state) => state.loggedUser);

  const location = useLocation();
  const history = useHistory();
  const areWeInLanding = location.pathname === "/";
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    saveLocalStorage();
  };
  const handleCloseFav = () => setShowFav(false);
  const handleShowFav = () => setShowFav(true);



  const dispatch = useDispatch();

  const logOutFunction = async () => {
    try {
      await signOut(auth);
      history.push("/");
    } catch (error) {
      toast.error("Something was wrong. try again later");
      // alert(error.message);
    }
  };

  const handleLogoutClick = (e) => {
    saveLocalStorage();
    dispatch(freeShoppingCartState());
    logOutFunction();
  };

  const handleShowUserList = (e) => {
    e.preventDefault();
    setShowUserList(!showUserList);
  };

  function saveLocalStorage() {
    localStorage.setItem(activeUserIs, JSON.stringify(userNfts));
    // activeUserIs == tag of item in localStorage
    console.log(cartItemsCount);
  }

  return (
    <div className={areWeInLanding ? "hidden" : "nav-bar"}>
      <Navbar className="brand-colorized-background-color" expand="lg">
        <Container fluid>
          <img
            alt=""
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
          />{" "}
          <Navbar.Brand>
            <Navbar.Text className="navbar-company-name-header brand-colorized-text">
              Non Fungible Town
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="brand-colorized-text" to="/home">
                Home
              </Link>
              <Link className="brand-colorized-text" to="/createNft">
                Create
              </Link>
            </Nav>
            <SearchBar />
            <Nav>
              <Link className="brand-colorized-text" to="/marketplace">
                MarketPlace
              </Link>
              <Link to="/collections" className="brand-colorized-text">
                Collections
              </Link>
              <Link to="/developerTeam" className="brand-colorized-text">
                Developer Team
              </Link>
              <div className="nav-bar-accountIcon">
                <AccountCircleIcon onClick={(e) => handleShowUserList(e)} />
              </div>

              {/* favorite */}
                <button
                className="control-icon"
                onClick={handleShowFav}
              >
                <FavoriteIcon />
                <span id="cart_Numer_Items" className="badge rounded-circle">
                  {userFavorites.length}    
                </span>
              </button>


              {/* end favorite-*/}


              {/* slide kart trigger*/}
              <button
                className="control-icon"
                onClick={handleShow}
              >
                <ShoppingCartIcon />
                <span id="cart_Numer_Items" className="badge rounded-circle">
                  {cartItemsCount.length}
                </span>
              </button>
              {/* slide kart*/}
              <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Shoppingkart />
                </Offcanvas.Body>
              </Offcanvas>

              {/* favorites comp */}
              <Offcanvas show={showFav} onHide={handleCloseFav} placement={"bottom"}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Favorites</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
          	 <Ufavorites />       
                </Offcanvas.Body>
              </Offcanvas>

                     </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UserIcon setVisible={handleShowUserList} visible={showUserList} />
    </div>
  );
}
