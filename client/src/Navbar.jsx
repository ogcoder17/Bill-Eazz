import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarRB from 'react-bootstrap/Navbar';

const Navbar = () => {
  return (
    <div>
      <NavbarRB expand="lg" className="bg-body-tertiary">
        <Container>
          <NavbarRB.Brand href="/Home" style={{fontFamily:"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",}}><img src="./BillEazz.png" alt="BillEazz Picture" width="40px" height="40px"></img> BILL EAZZ</NavbarRB.Brand>
          <NavbarRB.Toggle aria-controls="basic-navbar-nav" />
          <NavbarRB.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Bill Prototype</Nav.Link>
            </Nav>
          </NavbarRB.Collapse>
        </Container>
      </NavbarRB>
    </div>
  );
};

export default Navbar;