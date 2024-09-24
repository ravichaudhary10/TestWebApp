import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store";
import { router } from "./routes";
import "./__mock__";
import "./index.css";
import "./styles/global.styles.scss";

// Prime react imports
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PrimeReactProvider value={{ ripple: true }}>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </ReduxProvider>
  </React.StrictMode>
);
