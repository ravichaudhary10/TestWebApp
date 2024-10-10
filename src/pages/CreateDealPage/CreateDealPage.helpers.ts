import { DASHBOARD_TITLE } from "../../constants/global.constants";

import {
  EDIT_DEAL_PAGE_TITLE,
  CREATE_NEW_DEAL_PAGE_TITLE,
} from "./CreateDealPage.constants";

export const getBreadcrumbItems = (isEditDealPage: boolean) => {
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
    isEditDealPage
      ? { icon: "pi pi-pencil", label: EDIT_DEAL_PAGE_TITLE }
      : {
          icon: "pi pi-folder",
          label: CREATE_NEW_DEAL_PAGE_TITLE,
        },
  ];
};

/**
 * Returns appropriate page title based on parameter
 * @param isEditDealPage {boolean}
 * @returns {string}
 */
export const getPageTitle = (isEditDealPage: boolean) => {
  return isEditDealPage ? EDIT_DEAL_PAGE_TITLE : CREATE_NEW_DEAL_PAGE_TITLE;
};
