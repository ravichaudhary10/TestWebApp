import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ResourceListPage from "./pages/ResourceListPage";
import CreateDealPage from "./pages/CreateDealPage";
import CreateResourcePage from "./pages/CreateResourcePage";
import "./index.css";

import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/deals/:dealId",
    element: <ResourceListPage />,
  },
  {
    path: "/createdeal",
    element: <CreateDealPage />,
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
    <PrimeReactProvider value={{ ripple: true }}>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);
