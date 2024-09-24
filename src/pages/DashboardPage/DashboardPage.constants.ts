import { MenuItem } from "primereact/menuitem";

export const BREADCRUMB_HOME_TITLE = "Home";
export const DEALS_TITLE = "Deals";
export const HISTORY_TITLE = "History";

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
