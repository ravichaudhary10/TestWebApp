import { MenuItem } from "primereact/menuitem";

export const BREADCRUMB_HOME_TITLE = "Home";
export const DEALS_TITLE = "Deals";
export const HISTORY_TITLE = "History";
export const CREATE_NEW_DEAL_BUTTON_TITLE = "Create New Deal";
export const ONBOARD_DEAL_LEAD_BUTTON_TITLE = "Onboard Deal Lead";

export const BREADCRUMB_ITEMS: MenuItem[] = [
  {
    icon: "pi pi-home",
    label: BREADCRUMB_HOME_TITLE,
  },
];

export const TAB_MENU_ITEMS = [
  { label: DEALS_TITLE },
  { label: HISTORY_TITLE },
];
