import React, { useEffect } from "react";
import { Header } from "../../components/Header";
import { MenuItem } from "primereact/menuitem";
import { TabView, TabPanel } from "primereact/tabview";

import { dashboardPageTitle } from "./DashboardPage.constants";
import { Breadcrumb } from "../../components/Breadcrumb";

import "./DashboardPage.scss";
import { DealListView } from "../../components/DealListView";

const DashboardPage: React.FC = () => {
  const breadcrumbItems: MenuItem[] = [
    {
      icon: "pi pi-home",
      label: dashboardPageTitle,
      url: "/",
    },
  ];

  return (
    <div className="page">
      <Header />

      <div className="page__content-body">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="page__title">{dashboardPageTitle}</h1>

        <TabView>
          <TabPanel header="Deals" key="deals">
            <DealListView />
          </TabPanel>
          <TabPanel header="History" key="history">
            <p className="m-0">History</p>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default DashboardPage;
