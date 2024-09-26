/**
 * This file holds all application level constants
 */
export const ERROR_MESSAGES = {
  GENERIC: "The application has encountered an unknown error.",
  AUTHORIZATION: "You do not have permission to access this page",
};

export const DASHBOARD_TITLE = "My Dashboard";
export const CREATE_NEW_DEAL = "Create New Deal";
export const ONBOARD_DEAL_LEAD = "Onboard Deal Lead";
export const CANCEL = "Cancel";
export const SAVE = "Save";

export const MOCK_CONFIG: Record<string, boolean> = {
  "/deals/list": true,
  "/stages": true,
  "/therapeutic-areas": true,
  "/line-functions": true,
  "/login": true,
  "/search-person": true,
  "/deals/create": true,
  "/deals/delete": true,
  "/deals/update": true,
};
