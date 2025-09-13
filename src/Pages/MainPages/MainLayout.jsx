import React from "react";
import { Outlet } from "react-router";

import Home from "./Home/HomePage";

export default function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
