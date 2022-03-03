import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { AuthContext } from "./shared/context/auth-context";
import MainHeader from "./shared/components/nav/MainHeader";
import "./App.css";

import AllCasesList from "./cases/pages/AllCasesList";
import ApproveCaseList from "./cases/pages/ApproveCaseList";
import EditCase from "./cases/pages/EditCase";
import NewCase from "./cases/pages/NewCase";
import Login from "./users/pages/Login";
import UserCasesList from "./users/pages/UserCasesList";
import UserPage from "./users/pages/UserPage";
import ApproveCase from "./cases/pages/ApproveCase";
import ApprovePage from "./cases/pages/ApprovePage";
import AllCasesPage from "./cases/pages/AllCasesPage";
import { useAuth } from "./shared/hooks/auth-hook";

export const CONNSTR = "http://localhost:7000/api";

const App = () => {
  const { token, login, logout, userId, username, isComite } = useAuth();

  let routes;

  if (!token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </React.Fragment>
    );
  } else if (token && !isComite) {
    routes = (
      <React.Fragment>
        <Route path="/:uid/cases" element={<UserPage />}>
          <Route index element={<UserCasesList />} />
          <Route path="new" element={<NewCase />} />
          <Route path=":cid" element={<EditCase />} />
        </Route>
        <Route path="/" element={<Navigate to={`../${userId}/cases`} />} />
        <Route path="/*" element={<Navigate to={`../${userId}/cases`} />} />
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
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        isComite,
        userId,
        token,
        username,
      }}
    >
      <MainHeader />
      <Container className="mt-5">
        <Routes>{routes}</Routes>
      </Container>
    </AuthContext.Provider>
  );
};

export default App;
