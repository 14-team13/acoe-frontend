import { Col, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'

const AcoeNavbar = () => {
  return (
    <Navbar collapseOnSelect bg="light" expand="md">
      <Navbar.Brand href="/acoe" className="mgl25">ACOE</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className="mgl25">Map</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AcoeNavbar;
