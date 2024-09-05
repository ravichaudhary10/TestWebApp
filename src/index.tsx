import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ResourceListPage from "./pages/ResourceListPage";
import CreateDealPage from "./pages/CreateDealPage";
import CreateResourcePage from "./pages/CreateResourcePage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/createdeal",
    element: <CreateDealPage />,
  },
  {
    path: "/:dealId",
    element: <ResourceListPage />,
  },
  {
    path: "/createresource",
    element: <CreateResourcePage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
