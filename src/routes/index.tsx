import { createBrowserRouter } from "react-router-dom";
import { Path } from "./routes.constants";
import AuthGuard from "../guards/AuthGuard";
import { AppContainer } from "../pages/AppContainer";
import { DashboardPage } from "../pages/DashboardPage";
import { CreateDealPage } from "../pages/CreateDealPage";
import { DealDetailPage } from "../pages/DealDetailPage";
import AddResourcePage from "../pages/AddResourcePage/AddResourcePage";
import { Login } from "../pages/Login";
import { ErrorPage } from "../pages/ErrorPage";
import { OnboardDealLead } from "../pages/OnboardDealLead";

export const router = createBrowserRouter([
  {
    path: Path.ROOT,
    element: (
      <AuthGuard>
        <AppContainer />
      </AuthGuard>
    ),
    children: [
      {
        path: Path.ROOT,
        element: <DashboardPage />,
      },
      {
        path: Path.DEALS,
        element: <DashboardPage />,
      },
      {
        path: `${Path.CREATE_DEAL}`,
        element: <CreateDealPage />,
      },
      {
        path: `${Path.UPDATE_DEAL}/:dealId`,
        element: <CreateDealPage />,
      },
      {
        path: `${Path.ONBOARD_DEAL_LEAD}`,
        element: <OnboardDealLead />,
      },
      {
        path: `${Path.RESOURCES}/:dealId`,
        element: <DealDetailPage />,
      },
      {
        path: `${Path.RESOURCES}/:dealId/${Path.ADD_RESOURCE}`,
        element: <AddResourcePage />,
      },
      {
        path: `${Path.RESOURCES}/:dealId/${Path.UPDATE_RESOURCE}/:resourceId/stage/:stageId`,
        element: <AddResourcePage />,
      },
    ],
  },
  {
    path: Path.SSO_LOGIN,
    element: <Login />,
  },
  {
    path: Path.ERROR,
    element: <ErrorPage />,
  },
]);

export * from "./routes.constants";
