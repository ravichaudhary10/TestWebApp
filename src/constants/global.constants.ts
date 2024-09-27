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
};

export const DASHBOARD_TITLE = "My Dashboard";
export const CREATE_NEW_DEAL = "Create New Deal";
export const ONBOARD_DEAL_LEAD = "Onboard Deal Lead";
export const CANCEL = "Cancel";
export const SAVE = "Save";

export const MOCK_CONFIG: Record<string, boolean> = {
  dealsListAPI: true,
  dealDetailAPI: true,
  stagesAPI: true,
  therapeuticAreasAPI: true,
  lineFunctionsAPI: true,
  loginAPI: true,
  searchPersonAPI: true,
  createDealAPI: true,
  deleteDealAPI: true,
  updateDealAPI: true,
};
