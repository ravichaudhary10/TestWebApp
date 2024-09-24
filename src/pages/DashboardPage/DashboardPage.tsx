import React, { useState } from "react";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../components/Breadcrumb";

import { BREADCRUMB_ITEMS, TAB_MENU_ITEMS } from "./DashboardPage.constants";

import {
  DASHBOARD_TITLE,
  CREATE_NEW_DEAL,
  ONBOARD_DEAL_LEAD,
} from "../../constants/global.constants";

import { Tab } from "./DashboardPage.types";
import { DealListView } from "../../components/DealListView";
import { Path } from "../../routes";

// Prime React imports
import { TabMenu, TabMenuTabChangeEvent } from "primereact/tabmenu";
import { Button } from "primereact/button";
import RoleBasedGuard from "../../guards/RoleBasedGuard";
import { Role } from "../../types/commonTypes";

const DashboardPage: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const navigate = useNavigate();

  // Handles tab change event of the TabMenu
  const handleTabChange = (e: TabMenuTabChangeEvent) => {
    setActiveTabIndex(e.index);
  };

  // Opens create deal view
  const openCreateDealView = () => {
    navigate(Path.CREATE_DEAL);
  };

  // Opens onboard deal lead view
  const openOnboardDealLeadView = () => {
    navigate(Path.ONBOARD_DEAL_LEAD);
  };

  // Create the appropriate view based on the selected tab in TabMenu
  const selectedTabView =
    activeTabIndex === Tab.DEALS ? (
      <DealListView />
    ) : (
      <p className="m-0">History</p>
    );

  return (
    <div className="flex flex-column align-items-center">
      <Header />

      <div className="flex-1  w-11  p-3">
        <Breadcrumb items={BREADCRUMB_ITEMS} />

        <h1 className="font-bold text-xl line-height-2">{DASHBOARD_TITLE}</h1>

        <div className="flex align-items-center mb-3 w-full">
          <TabMenu
            activeIndex={activeTabIndex}
            model={TAB_MENU_ITEMS}
            onTabChange={handleTabChange}
            style={{ display: "inline-block" }}
          />
          <div className="flex flex-1 gap-2 justify-content-end ">
            <Button
              label={CREATE_NEW_DEAL}
              size="small"
              onClick={openCreateDealView}
            />
            <RoleBasedGuard accessibleRoles={[Role.ADMIN]}>
              <Button
                label={ONBOARD_DEAL_LEAD}
                size="small"
                onClick={openOnboardDealLeadView}
              />
            </RoleBasedGuard>
          </div>
        </div>

        {selectedTabView}
      </div>
    </div>
  );
};

export default DashboardPage;
