/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./home/index.jsx";
import Dashboard from "./dashboard/index.jsx";
import LoginSignup from "./auth/sign-in/index.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import ViewResume from "./my-resume/[resumeId]/view/index.jsx";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/register",
        element: <LoginSignup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/:email/:resumeId/edit",
            element: <EditResume />,
          },
          {
            path: "/dashboard/:email/:resumeId/view",
            element: <ViewResume />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
