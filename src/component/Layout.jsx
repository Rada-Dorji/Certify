import { Outlet } from "react-router-dom";

import React from "react";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="App">
        <Navbar/>
      <Outlet />
    </div>
  );
};

export default Layout;