import React, { useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import AllCasesList from "./cases/pages/AllCasesList";
import ApproveCaseList from "./cases/pages/ApproveCaseList";
import EditCase from "./cases/pages/EditCase";
import NewCase from "./cases/pages/NewCase";
import Login from "./users/pages/Login";
import UserCasesList from "./users/pages/UserCasesList";
import UserPage from "./users/pages/UserPage";

import MainHeader from "./shared/components/nav/MainHeader";

import "./App.css";
import ApproveCase from "./cases/pages/ApproveCase";
import { AuthContext } from "./shared/context/auth-context";
import ApprovePage from "./cases/pages/ApprovePage";
import AllCasesPage from "./cases/pages/AllCasesPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isComite, setIsComite] = useState(false);
  const [userCode, setUserCode] = useState("");

  const login = useCallback((uc: string, ic: boolean) => {
    console.log(uc, ic);

    setIsLoggedIn(true);
    setUserCode(uc);
    setIsComite(ic);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsComite(false);
    setUserCode("");
  }, []);

  let routes;

  if (!isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </React.Fragment>
    );
  } else if (isLoggedIn && !isComite) {
    routes = (
      <React.Fragment>
        <Route path="/:uid/cases" element={<UserPage />}>
          <Route index element={<UserCasesList />} />
          <Route path="new" element={<NewCase />} />
          <Route path=":cid" element={<EditCase />} />
        </Route>
        <Route path="/" element={<Navigate to={`../${userCode}/cases`} />} />
        <Route path="/*" element={<Navigate to={`../${userCode}/cases`} />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/comite/cases" element={<AllCasesPage />}>
          <Route index element={<AllCasesList />} />
          <Route path=":cid" element={<EditCase />} />
        </Route>
        <Route path="/comite/cases/approve" element={<ApprovePage />}>
          <Route index element={<ApproveCaseList />} />
          <Route path=":cid" element={<ApproveCase />} />
        </Route>
        <Route path="/" element={<Navigate replace to="../comite/cases" />} />
        <Route path="*" element={<Navigate replace to="../comite/cases" />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isComite, userCode }}
    >
      <MainHeader />
      <Container className="mt-5">
        <Routes>{routes}</Routes>
      </Container>
    </AuthContext.Provider>
  );
};

export default App;
