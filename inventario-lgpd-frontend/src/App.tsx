import React from "react";
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

const App = () => {
  return (
    <React.Fragment>
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
          <Route path="/cases/approve" element={<ApproveCaseList />} />
          <Route path="/cases/approve/:cid" element={<ApproveCase />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
