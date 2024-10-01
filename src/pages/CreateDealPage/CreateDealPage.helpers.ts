import {
  CREATE_NEW_DEAL,
  DASHBOARD_TITLE,
  EDIT_DEAL,
} from "../../constants/global.constants";

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
      ? { icon: "pi pi-pencil", label: EDIT_DEAL }
      : {
          icon: "pi pi-folder",
          label: CREATE_NEW_DEAL,
        },
  ];
};

/**
 * Returns appropriate page title based on parameter
 * @param isEditDealPage {boolean}
 * @returns {string}
 */
export const getPageTitle = (isEditDealPage: boolean) => {
  return isEditDealPage ? EDIT_DEAL : CREATE_NEW_DEAL;
};
