import { MenuItem } from "primereact/menuitem";

import {
  CREATE_NEW_DEAL,
  DASHBOARD_TITLE,
} from "../../constants/global.constants";

export const BREADCRUMB_ITEMS: MenuItem[] = [
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
  {
    icon: "pi pi-folder",
    label: CREATE_NEW_DEAL,
  },
];

// Field labels
export const DEAL_NAME = "Deal Name";
export const THERAPEUTIC_AREA = "Therapeutic Area";
export const DEAL_STAGE = "Deal Stage";
export const ADD_DEAL_LEAD = "Add Deal Lead";
export const DEAL_LEAD_DETAILS = "Deal Lead Details";

// Constants related to Confirmation dialog
export const DEAL_LEAD_REMOVAL_CONFIRMATION_MSG =
  "Are you sure you want to remove the deal lead?";
export const DEAL_LEAD_REMOVAL_CONFIRMATION_HEADER = "Confirm Removal";
export const CONFIRMATION_ACCEPT_LABEL = "Confirm";
export const CONFIRMATION_REJECT_LABEL = "Cancel";
export const CANCEL_CREATE_DEAL_CONFIRMATION_MSG =
  "Are you sure you want to cancel?";
export const CANCEL_CREATE_DEAL_CONFIRMATION_HEADER = "Confirm";
