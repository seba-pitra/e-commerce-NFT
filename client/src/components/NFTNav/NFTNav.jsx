import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar'
import logo from '../../images/logo/logo.png';
import './NFTNav.css';

export default function NFTNav() {
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}