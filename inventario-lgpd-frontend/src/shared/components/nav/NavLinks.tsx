import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";

import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "./../../context/auth-context";

const NavLinks = () => {
  const authContext = useContext(AuthContext);

  return (
    <React.Fragment>
      {authContext.isLoggedIn && (
        <Nav.Link eventKey={1} as={NavLink} to="/">
          Página Inicial
        </Nav.Link>
      )}
      {authContext.isLoggedIn && !authContext.isComite && (
        <Nav.Link
          eventKey={2}
          as={NavLink}
          to={`${authContext.userCode}/cases/new`}
        >
          Novo
        </Nav.Link>
      )}
      {authContext.isLoggedIn && authContext.isComite && (
        <Nav.Link eventKey={3} as={NavLink} to={`comite/cases/approve`}>
          Aprovações Pendentes
        </Nav.Link>
      )}
      {authContext.isLoggedIn && (
        <Nav.Link eventKey={4} onClick={authContext.logout}>
          Sair
        </Nav.Link>
      )}
      {!authContext.isLoggedIn && (
        <Nav.Link eventKey={5} as={NavLink} to="/login">
          Login
        </Nav.Link>
      )}
    </React.Fragment>
  );
};

export default NavLinks;
