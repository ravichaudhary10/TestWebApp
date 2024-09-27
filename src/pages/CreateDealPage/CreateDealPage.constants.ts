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
];

// Field labels
export const DEAL_NAME = "Project Code";
export const THERAPEUTIC_AREA = "Therapeutic Area";
export const DEAL_STAGE = "Stage";
export const DEAL_LEAD = "Deal Lead";
export const ADD_DEAL_LEAD = "Add Deal Lead";
export const DEAL_LEAD_DETAILS = "Deal Lead Details";

// Constants related to Confirmation dialog
export const DEAL_LEAD_REMOVAL_CONFIRMATION_MSG =
  "Are you sure you want to remove the deal lead?";
export const DEAL_DELETION_CONFIRMATION_MSG =
  "Are you sure you want to delete this deal?";

export const DEAL_DELETION_CONFIRMATION_HEADER = "Confirm Deletion";

export const DEAL_LEAD_REMOVAL_CONFIRMATION_HEADER = "Confirm Removal";
export const CONFIRMATION_ACCEPT_LABEL = "Confirm";
export const CONFIRMATION_REJECT_LABEL = "Cancel";
export const CANCEL_CREATE_DEAL_CONFIRMATION_MSG =
  "Are you sure you want to cancel?";
export const CANCEL_CREATE_DEAL_CONFIRMATION_HEADER = "Confirm";

export const REQUIRED_MESSAGE = "{0} is required";

export enum Field {
  DEAL_NAME = "name",
  DEAL_STAGE = "stage",
  THERAPEUTIC_AREA = "therapeuticArea",
  DEAL_LEAD = "dealLead",
}
