import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../images/logo/logo.png";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Shoppingkart from "../Shoppingkart/Shoppingkart";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./NFTNav.css";

export default function NFTNav() {
  const [show, setShow] = useState(false);

  const location = useLocation();
  const areWeInLanding = location.pathname === "/";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="brand-colorized-text" href='/home'>Home</Nav.Link>
            <Nav.Link  className="brand-colorized-text" href='/createNft'>Create</Nav.Link>
          </Nav>
          <SearchBar/>
          <Nav>
            <Nav.Link className="brand-colorized-text" href="http://localhost:3000/marketplace">MarketPlace</Nav.Link>
            <Nav.Link className="brand-colorized-text" href="/login">Log in</Nav.Link>
            <Nav.Link className="brand-colorized-text" href="/signup">Sign up</Nav.Link>
          {/* slide kart trigger*/ } 
            <button  style={{backgroundColor: "black", color: "#D3448B",border: "none" }} onClick={handleShow}><ShoppingCartIcon /></button>
          {/* slide kart*/}
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Shoppingkart/>
            </Offcanvas.Body>
            </Offcanvas>
          {/* slide kart*/}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
