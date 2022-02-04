import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <React.Fragment>
      <Nav.Link eventKey={1} as={NavLink} to="/1/cases">
        Página Inicial
      </Nav.Link>
      <Nav.Link eventKey={2} as={NavLink} to="/cases/new">
        Novo
      </Nav.Link>
      <Nav.Link eventKey={3} as={NavLink} to="/logout">
        Sair
      </Nav.Link>
      <Nav.Link eventKey={4} as={NavLink} to="/cases/approve">
        Aprovações Pendentes
      </Nav.Link>
    </React.Fragment>
  );
};

export default NavLinks;
