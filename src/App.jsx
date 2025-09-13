import { createBrowserRouter, Router, RouterProvider } from "react-router";
import "./App.css";
import React from "react";
import AuthLayout from "./Pages/AuthPages/AuthLayout";
import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register";
import MainLayout from "./Pages/MainPages/MainLayout";
import ProtectedAuthRoute from "./ProtectedRoute/ProtectedAuthRoute";
import ProtectedRoutes from "./ProtectedRoute/ProtectedRoutes";
import HomePage from "./Pages/MainPages/Home/HomePage";

function App() {
  const route = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: (
            <ProtectedAuthRoute>
              <Login />
            </ProtectedAuthRoute>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuthRoute>
              <Register />
            </ProtectedAuthRoute>
          ),
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              {" "}
              <HomePage />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
