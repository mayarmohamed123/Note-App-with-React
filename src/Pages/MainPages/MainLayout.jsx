import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../assets/Components/Navbar";
import MainSection from "../../assets/Components/MainSection";
import Home from "./Home/HomePage";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <MainSection />
      <Outlet />
    </div>
  );
}
