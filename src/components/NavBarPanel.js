import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbar.css';
import { IoCartOutline } from "react-icons/io5";

export const NavBarPanel = () => {

  const cart = useSelector(state => state.cart.cart);
  const cartLength = cart.length;
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/" className="custom-navbar-brand" style={{ fontWeight: 800, fontSize: '32px' }}>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <div className="nav-link-container">
                <Nav.Link as={Link} to="/cart"><IoCartOutline size={"30"}/></Nav.Link>
                <div className='badge'>{cartLength}</div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
