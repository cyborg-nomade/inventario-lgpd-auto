import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { NavLink, Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header>
      <Navbar bg="dark" expand={"md"} collapseOnSelect>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Inventário LGPD
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link eventKey={1} as={NavLink} to="/">
                Página Inicial
              </Nav.Link>
              <Nav.Link eventKey={2} as={NavLink} to="/cases/new">
                Novo
              </Nav.Link>
              <Nav.Link eventKey={3} as={NavLink} to="/logout">
                Sair
              </Nav.Link>
              <NavDropdown title="Ações do Comitê" id="offcanvasNavbarDropdown">
                <NavDropdown.Item eventKey={4} as={NavLink} to="/cases/approve">
                  Aprovações Pendentes
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default MainHeader;
