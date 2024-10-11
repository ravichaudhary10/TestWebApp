import { DASHBOARD_TITLE } from "../../constants/global.constants";
import { DEAL_DETAIL_PAGE_TITLE } from "./DealDetailPage.constants";

export const getBreadcrumbItems = (navigate: Function) => {
  return [
    {
      icon: "pi pi-arrow-left",
      label: "Go back",
      command: navigate(-1),
    },
    {
      icon: "pi pi-home",
      label: DASHBOARD_TITLE,
      url: "/",
    },
    { icon: "pi pi-folder", label: DEAL_DETAIL_PAGE_TITLE },
  ];
};
