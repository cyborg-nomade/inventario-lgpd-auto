import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NewCase from "./cases/pages/NewCase";
import Users from "./users/pages/Users";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/cases/new" element={<NewCase />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
