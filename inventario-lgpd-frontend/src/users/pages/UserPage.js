import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../../shared/components/nav/MainHeader";

const UserPage = () => {
  return (
    <React.Fragment>
      <MainHeader />
      <Outlet />
    </React.Fragment>
  );
};

export default UserPage;
