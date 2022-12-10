import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar'
import logo from '../../images/logo/logo.png';
import './NFTNav.css';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

//import  Shoppingkart from '../Shoppingkart/Shoppingkart'
import Offcanvas from 'react-bootstrap/Offcanvas';
import {React, useState } from 'react';


export default function NFTNav() {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);



return (
    <Navbar className="brand-colorized-background-color" expand="lg">
      <Container fluid>
            <img
              alt=""
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
            /> {' '}
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
            <Nav.Link href='/home'>Home</Nav.Link>
            <Nav.Link href='/create'>Create</Nav.Link>
          </Nav>
          <SearchBar/>
          <Nav>
            <Nav.Link className="brand-colorized-text" href="/login">Log in</Nav.Link>
            <Nav.Link  className="brand-colorized-text" href="/signup">Sign up</Nav.Link>
	  
	 <button onClick={handleShow}> <ShoppingCartIcon /></button>

 <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
Gracias por su compra.
	 </Offcanvas.Body>
      </Offcanvas>
	 <h1>content</h1>



	</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
