import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "../src/pages/Home/Home";
import AddAToy from "../src/pages/AddAToy/AddAToy";
import ToyDetails from "../src/pages/ToyDetails/ToyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addatoy",
    element: <AddAToy />,
  },
  {
    path: "/toydetails/:id",
    element: <ToyDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
