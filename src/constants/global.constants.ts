/**
 * This file holds all application level constants
 */
export const ERROR_MESSAGES = {
  GENERIC: "The application has encountered an unknown error.",
  AUTHORIZATION: "You do not have permission to access this page",
  GENERIC_API_ERROR: "Something went wrong.",
};

export const SUCCESS_MESSAGES = {
  DEAL_CREATION_SUCCESS: "Deal created successfully",
  DEAL_UPDATION_SUCCESS: "Deal updated successfully",
  DEAL_DELETION_SUCCESS: "Deal deleted successfully",
  TA_ASSIGNMENT_SUCCESS: "Therapeutic areas assigned successfully",
};

export const DASHBOARD_TITLE = "My Dashboard";
export const CANCEL = "Cancel";
export const SAVE = "Save";
export const CONFIRM_LABEL = "Confirm";
export const CANCEL_LABEL = "Cancel";
export const ASSIGN_LABEL = "Assign";
export const DEAL_LEAD_DETAILS = "Deal Lead Details";
export const CLEAR_ALL_LABEL = "Clear All";

export const MOCK_CONFIG: Record<string, boolean> = {
  dealListAPI: true,
  dealDetailAPI: true,
  stagesAPI: true,
  therapeuticAreasAPI: true,
  lineFunctionsAPI: true,
  resourceListAPI: true,
  loginAPI: true,
  searchPersonAPI: true,
  createDealAPI: true,
  deleteDealAPI: true,
  updateDealAPI: true,
  taAssignAPI: true,
};
