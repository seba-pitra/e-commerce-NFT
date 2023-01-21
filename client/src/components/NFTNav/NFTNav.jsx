import * as actions from "../../redux/actions/index";
import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../images/logo/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Shoppingkart from "../Shoppingkart/Shoppingkart";
import Ufavorites from "../uFavorites/Ufavorites.jsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MaterialUISwitch from "../Pages/switch";

import UserIcon from "./UserIcon/UserIcon";
import ProfilePicture from "../UserComponents/ProfilePicture/Profile.Picture";

import useStyles from "../../customHooks/useStyles";
import lightStyles from "./stylesheets/LightNFTNav.module.css";
import darkStyles from "./stylesheets/DarkNFTNav.module.css";

import { useLoggedUser } from "../../customHooks/useLoggedUser";
export default function NFTNav() {
  const location = useLocation();

  const dispatch = useDispatch();

  const styles = useStyles(darkStyles, lightStyles);

  const [show, setShow] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const cartItemsCount = useSelector((state) => state.shoppingCartContents);
  const userFavorites = useSelector((state) => state.userFavs);
  const loggedUserGlobal = useSelector((state) => state.loggedUser);	
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()
  const activeThemeIsDark = useSelector((state) => state.activeThemeIsDark);
  const areWeInLanding = location.pathname === "/";
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
	  localStorage.setItem(JSON.stringify(loggedUser.email + "CART"),JSON.stringify(cartItemsCount));
	  setShow(true)};
  const handleCloseFav = () => setShowFav(false);
  const handleShowFav = () => setShowFav(true);

  const handleShowUserList = (e) => {
    e.preventDefault();
    setShowUserList(!showUserList);
  };

  const onSwitch = () => {
    dispatch(actions.toggleTheme());
    // Theme LocalStorage Saver
    //console.log(activeThemeIsDark);
    localStorage.setItem(JSON.stringify(loggedUser.email + "theme"),JSON.stringify(activeThemeIsDark));
  };



	
useEffect(() => {
// Aqui no estaba el user
//console.log(loggedUser.email);  // devuelve null si no logea o se refresca la pag
//console.log(store.getState().loggedUser.email);  // devuelve null si no logea o se refresca la pagina
//console.log(loggedUserGlobal);	// devuelve null si no logea o se regresca la pag 

	//Aqui si esta el usuario logeado
      let localStorageUser = JSON.parse(localStorage.getItem("User"));
	console.log('Usuario Activo');
	console.log(localStorageUser);
	// los loaders funcionan bien si el usuario esta logeado y tiene persistencia al refresh
	

// Loading Theme, Favs, ShoppingCart items on refresh

// Tema
	let SavedTheme = JSON.parse(localStorage.getItem(JSON.stringify(localStorageUser+'theme')));  
	console.log('TEMA!!')
	 console.log(SavedTheme)
	 //if (SavedTheme) { dispatch(actions.injectLocalStorageTheme(SavedTheme))}
	 //{ dispatch(actions.toggleTheme())};

// Favs

	let SavedFavorites = JSON.parse(localStorage.getItem(JSON.stringify(localStorageUser+'FAVS')));  
	console.log('FAVS!!')
	console.log(SavedFavorites);
	if (SavedFavorites){dispatch(actions.addToFav(SavedFavorites))};

// ShoppingCart Items

	let SavedCartItems = JSON.parse(localStorage.getItem(JSON.stringify(localStorageUser+'CART')));  
	console.log('CART!!')
	console.log(SavedCartItems);
	if (SavedFavorites){dispatch(actions.addNftOnShoppingCart(SavedCartItems))};

// -------------------------------------------------
  }, [dispatch]);


  return (
    <div className={areWeInLanding ? "hidden" : "nav-bar"}>
      <Navbar className={styles["nav-bar-container"]} expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Link className={styles["nav-bar-link"]} to="/home">
              <Navbar.Text className={styles["nav-bar-company-name-header"]}>
                Non Fungible Town
              </Navbar.Text>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={
              activeThemeIsDark
                ? { backgroundColor: "#fafafa" }
                : { backgroundColor: "#eaeaea " }
            }
          />

          <Navbar.Collapse
            className={styles["nav-bar-company-links-container"]}
          >
            {(location.pathname === "/marketplace" ||
              location.pathname === "/collections") && <SearchBar />}
            <Link className={styles["nav-bar-link"]} to="/marketplace">
              Explore
            </Link>
            <Link
              // className={styles["nav-bar-link"]}
              className={`brand-colorized-text ${
                loggedUser
                  ? loggedUser.type === "Basic" ||
                    loggedUser.type === "VerificationInProcess"
                    ? styles["noneDisplay"]
                    : styles["nav-bar-link"]
                  : styles["nav-bar-link"]
              }`}
              to="/createNft"
            >
              Create
            </Link>
            <Link to="/collections" className={styles["nav-bar-link"]}>
              Collections
            </Link>
            <Link to="/developerTeam" className={styles["nav-bar-link"]}>
              Developer Team
            </Link>
            <MaterialUISwitch
              className={styles["switch-dark-ligth"]}
              onClick={onSwitch}
            />
            <div className="nav-bar-accountIcon">
              <ProfilePicture handleShowUserList={handleShowUserList} />
            </div>
            {/* favorite */}
            <button className={styles["control-icon"]} onClick={handleShowFav}>
              <FavoriteIcon />

              <span className={styles["cart_Numer_Items"]}>
                {userFavorites.length}
              </span>
            </button>

            {/* slide kart trigger*/}
            <button className={styles["control-icon"]} onClick={handleShow}>
              <ShoppingCartIcon />
              <span className={styles["cart_Numer_Items"]}>
                {cartItemsCount.length}
              </span>
            </button>

            {/* slide kart*/}
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
              <div className={styles["conteiner-shopping-cart"]}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Shoppingkart />
                </Offcanvas.Body>
              </div>
            </Offcanvas>

            {/* favorites comp */}
            <Offcanvas
              show={showFav}
              onHide={handleCloseFav}
              placement={"bottom"}
              className={styles["offcanvas-scrollbar"]}
              style={{ height: "fit-content" }}
            >
              <Offcanvas.Body>
                <Ufavorites />
              </Offcanvas.Body>
            </Offcanvas>
            {/* </Nav> */}
          </Navbar.Collapse>
        </Container>
        <UserIcon setVisible={handleShowUserList} visible={showUserList} />
      </Navbar>
    </div>
  );
}
