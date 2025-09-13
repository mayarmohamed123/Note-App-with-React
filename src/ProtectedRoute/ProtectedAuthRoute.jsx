import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

export default function ProtectedAuthRoute({ children }) {
  const { isLoggedIn } = useContext(authContext);
  return !isLoggedIn ? children : <Navigate to={"/"} />;
}
