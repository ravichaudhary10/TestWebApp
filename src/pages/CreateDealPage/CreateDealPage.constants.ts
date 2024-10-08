// Field labels
export const DEAL_NAME = "Project Code";
export const THERAPEUTIC_AREA = "Therapeutic Area";
export const DEAL_STAGE = "Stage";
export const DEAL_LEAD = "Deal Lead";
export const ADD_DEAL_LEAD = "Add Deal Lead";

// Constants related to Confirmation dialog
export const DEAL_LEAD_REMOVAL_CONFIRMATION_MSG =
  "Are you sure you want to remove the deal lead?";
export const DEAL_DELETION_CONFIRMATION_MSG =
  "Are you sure you want to delete this deal?";
export const DEAL_DELETION_CONFIRMATION_HEADER = "Confirm Deletion";
export const DEAL_LEAD_REMOVAL_CONFIRMATION_HEADER = "Confirm Removal";
export const CANCEL_CREATE_DEAL_CONFIRMATION_MSG =
  "Are you sure you want to cancel?";
export const CANCEL_CREATE_DEAL_CONFIRMATION_HEADER = "Confirm";
export const REQUIRED_MESSAGE = "{0} is required";

export const DEAL_LEAD_NO_TA_ASSIGNMENT_HEADER = "Assign TA to Deal Lead";
export const DEAL_LEAD_NO_TA_ASSIGNMENT_MSG =
  "The selected deal lead does not currently have the Therapeutic Area ({0}) assigned. Would you like to assign the Therapeutic Area now?";

export enum Field {
  DEAL_NAME = "name",
  DEAL_STAGE = "stage",
  THERAPEUTIC_AREA = "therapeuticArea",
  DEAL_LEAD = "dealLead",
}
