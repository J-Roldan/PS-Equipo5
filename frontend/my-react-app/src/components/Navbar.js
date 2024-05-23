import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/Home">Fashion Trend</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/ProductManagement">Productos</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/MiCuenta">Mi Cuenta</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
