import {
  ONBOARD_DEAL_LEAD,
  DASHBOARD_TITLE,
} from "../../constants/global.constants";

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
    { icon: "pi pi-user-plus", label: ONBOARD_DEAL_LEAD },
  ];
};
