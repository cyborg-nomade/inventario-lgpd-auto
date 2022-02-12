import React, { useState, useCallback, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import AllCasesList from "./cases/pages/AllCasesList";
import ApproveCaseList from "./cases/pages/ApproveCaseList";
import EditCase from "./cases/pages/EditCase";
import NewCase from "./cases/pages/NewCase";
import Login from "./users/pages/Login";
import Logout from "./users/pages/Logout";
import UserCasesList from "./users/pages/UserCasesList";
import UserPage from "./users/pages/UserPage";

import MainHeader from "./shared/components/nav/MainHeader";

import "./App.css";
import ApproveCase from "./cases/pages/ApproveCase";
import { AuthContext } from "./shared/context/auth-context";
import ApprovePage from "./cases/pages/ApprovePage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isComite, setIsComite] = useState(false);
  const [userCode, setUserCode] = useState("");

  const authContext = useContext(AuthContext);

  const login = useCallback((uc, ic) => {
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

  if (authContext.isLoggedIn) {
    routes = <React.Fragment></React.Fragment>;
  } else {
    routes = <React.Fragment></React.Fragment>;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isComite, userCode }}
    >
      <MainHeader />
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/:uid/cases" element={<UserPage />}>
            <Route index element={<UserCasesList />} />
            <Route path=":cid" element={<EditCase />} />
          </Route>
          <Route path="/cases/new" element={<NewCase />} />
          <Route path="/cases/:cid" element={<EditCase />} />
          <Route path="/cases/" element={<AllCasesList />} />
          <Route path="/cases/approve" element={<ApprovePage />}>
            <Route index element={<ApproveCaseList />} />
            <Route path=":cid" element={<ApproveCase />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </AuthContext.Provider>
  );
};

export default App;
