import React, { useState, useCallback, useEffect } from "react";
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

export const CONNSTR = "http://localhost:7000/api";

let logoutTimer: NodeJS.Timeout;

interface storageObject {
  token: string;
  uid: string;
  isComite: boolean;
  expirationDate: string;
}

const App = () => {
  const [token, setToken] = useState("");
  const [isComite, setIsComite] = useState(false);
  const [userId, setUserId] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();

  const login = useCallback(
    (uid: string, ic: boolean, token: string, expirationDate?: Date) => {
      setToken(token);
      setUserId(uid);
      setIsComite(ic);
      const expDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(expDate);

      const userToStore: storageObject = {
        token,
        uid,
        isComite: ic,
        expirationDate: expDate.toISOString(),
      };

      localStorage.setItem("userData", JSON.stringify(userToStore));
    },
    []
  );

  const logout = useCallback(() => {
    setToken("");
    setIsComite(false);
    setUserId("");
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
    return () => {};
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const userDataObject: storageObject = userData
      ? JSON.parse(userData)
      : null;
    const storedExpirationDate = userDataObject
      ? new Date(userDataObject.expirationDate)
      : undefined;
    if (
      userDataObject &&
      userDataObject.token &&
      storedExpirationDate &&
      storedExpirationDate > new Date()
    ) {
      login(
        userDataObject.uid,
        userDataObject.isComite,
        userDataObject.token,
        storedExpirationDate
      );
    }
  }, [login]);

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
      value={{ isLoggedIn: !!token, login, logout, isComite, userId, token }}
    >
      <MainHeader />
      <Container className="mt-5">
        <Routes>{routes}</Routes>
      </Container>
    </AuthContext.Provider>
  );
};

export default App;
