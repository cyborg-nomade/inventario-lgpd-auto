import React from "react";
import CasesList from "./../../shared/components/CasesList";
import { Outlet } from "react-router-dom";

const UserPage = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default UserPage;
