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
  RESOURCE_CREATION_SUCCESS: "Resource created successfully",
  RESOURCE_UPDATION_SUCCESS: "Resource updated successfully",
  RESOURCE_DELETION_SUCCESS: "Resource deleted successfully",
};

// Various titles and button labels
export const DASHBOARD_TITLE = "My Dashboard";
export const CANCEL = "Cancel";
export const SAVE = "Save";
export const CONFIRM_LABEL = "Confirm";
export const CANCEL_LABEL = "Cancel";
export const ASSIGN_LABEL = "Assign";
export const DEAL_LEAD_DETAILS = "Deal Lead Details";
export const CLEAR_ALL_LABEL = "Clear All";
export const CANCEL_FORM_CONFIRMATION_MSG = "Are you sure you want to cancel?";
export const CANCEL_FORM_CONFIRMATION_HEADER = "Confirm";
export const REQUIRED_MESSAGE = "{0} is required";

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
  resourceDetailAPI: true,
  addResourcesAPI: true,
  updateResourceAPI: true,
  deleteResourceAPI: true,
};
