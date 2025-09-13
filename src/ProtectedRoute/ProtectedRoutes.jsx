import React, { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import Login from "../Pages/AuthPages/Login/Login";

export default function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useContext(authContext);
  return isLoggedIn ? children : <Login />;
}
