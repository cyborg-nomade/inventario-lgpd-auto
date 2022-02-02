import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NewCase from "./cases/pages/NewCase";
import UserPage from "./users/pages/UserPage";
import Login from "./users/pages/Login";
import EditCase from "./cases/pages/EditCase";
import CasesList from "./cases/pages/CasesList";
import ApproveCaseList from "./cases/pages/ApproveCaseList";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:uid/cases" element={<UserPage />} />
      <Route path="/cases/new" element={<NewCase />} />
      <Route path="/cases/:cid" element={<EditCase />} />
      <Route path="/cases/" element={<CasesList />} />
      <Route path="/cases/approve" element={<ApproveCaseList />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
