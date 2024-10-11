import { DASHBOARD_TITLE } from "../../constants/global.constants";
import { ONBOARD_DEAL_LEAD_PAGE_TITLE } from "./OnboardDealLead.constants";

export const getBreadcrumbItems = () => {
  return [
    {
      icon: "pi pi-arrow-left",
      label: "Go back",
    },
    {
      icon: "pi pi-home",
      label: DASHBOARD_TITLE,
      url: "/",
    },
    { icon: "pi pi-user-plus", label: ONBOARD_DEAL_LEAD_PAGE_TITLE },
  ];
};
