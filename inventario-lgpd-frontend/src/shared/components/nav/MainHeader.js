import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const MainHeader = () => {
  return (
    <header>
      <Navbar bg="light" expand={"md"} collapseOnSelect>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Inventário LGPD
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className="justify-content-end flex-grow-1 pe-3"
              variant="tabs"
            >
              <NavLinks />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default MainHeader;
