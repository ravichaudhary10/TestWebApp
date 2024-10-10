import { DASHBOARD_TITLE } from "../../constants/global.constants";
import { DEAL_DETAIL_PAGE_TITLE } from "./DealDetailPage.constants";

export const getBreadcrumbItems = () => {
  return [
    {
      icon: "pi pi-arrow-left",
      label: "Go back",
      url: "#",
    },
    {
      icon: "pi pi-home",
      label: DASHBOARD_TITLE,
      url: "#",
    },
    { icon: "pi pi-folder", label: DEAL_DETAIL_PAGE_TITLE },
  ];
};
